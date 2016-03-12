import os
import json
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify
from flask.views import MethodView
from flask.ext.cors import CORS
from database import ElasticStorage, RedisClient
from article import Article as ESArticle

app = Flask(__name__)
CORS(app)

#sql_config = json.loads(os.getenv('VCAP_SERVICES'))
#app.config['SQLALCHEMY_DATABASE_URI'] = sql_config['sqldb'][0]['credentials']['uri']
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://alius_admin:starthack16@alius.czpsbuodkwp9.eu-west-1.rds.amazonaws.com:5432/alius'
db = SQLAlchemy(app)

source_map = {
    'cnn.com': 'CNN', 'nytimes.com': 'New York Times',
    'huffingtonpost.com': 'The Huffington Post',
    'huffingtonpost.ca': 'The Huffington Post', 'theguardian.com': 'The Guardian',
    'foxnews.com': 'Fox News', 'forbes.com': 'Forbes',
    'timesofindia.indiatimes.com': 'The Times of India', 'bbc.co.uk': 'BBC',
    'usatoday.com': 'USA Today', 'bloomberg.com': 'Bloomberg',
    'wsj.com': 'The Wall Street Journal', 'reuters.com': 'Reuters',
    'nbcnews.com': 'NBC News', 'money.cnn.com': 'CNN Money',
    'indianexpress.com': 'The Indian Express', 'cbsnews.com': 'CBS News',
    'abcnews.go.com': 'ABC News', 'latimes.com': 'LA Times',
    'time.com': 'Time', 'nypost.com': 'NY Post', 'cnbc.com': 'CNBC',
    'thehindu.com': 'The Hindu', 'chron.com': 'CHRON',
    'theatlantic.com': 'The Atlantic', 'breitbart.com': 'Breitbart',
    'sfgate.com': 'SF Gate', 'usnews.com': 'US News',
    'hindustantimes.com': 'Hindustan Times', 'hollywoodreporter.com': 'The Hollywood Reporter',
    'fortune.com': 'Fortune', 'chicagotribune.com': 'Chicago Tribune',
    'news.com.au': 'news.com.au'
}


class Users(db.Model):
    user_id = db.Column(db.String(1024), primary_key=True)
    anger = db.Column(db.Float)
    disgust = db.Column(db.Float)
    fear = db.Column(db.Float)
    joy = db.Column(db.Float)
    sadness = db.Column(db.Float)
    total_articles = db.Column(db.Integer)

    def __init__(self, user_id, article_id):
        self.user_id = user_id
        es = ElasticStorage.get_instance(dev=False)
        doc = ESArticle.get(article_id)
        self.anger = doc.tone.anger
        self.disgust = doc.tone.disgust
        self.fear = doc.tone.fear
        self.joy = doc.tone.anger
        self.sadness = doc.tone.anger
        self.total_articles = 1

    def to_dict(self):
        return {'user_id': self.user_id, 'anger': self.anger, 'disgust': self.disgust, 'fear': self.fear,
                'joy': self.joy, 'sadness': self.sadness, 'total_articles': self.total_articles}


class Articles(db.Model):
    article_id = db.Column(db.String(1024), primary_key=True)
    clicks = db.Column(db.Integer)

    def __init__(self, article_id):
        self.article_id = article_id
        self.clicks = 1

    def to_dict(self):
        return {'article_id': self.article_id, 'clicks': self.clicks}


class UserAPI(MethodView):
    def get(self):
        all_users = Users.query.all()
        return json.dumps([x.to_dict() for x in all_users])

    def post(self):
        user_id = json.loads(request.data.decode('utf-8'))['user_id']
        article_id = json.loads(request.data.decode('utf-8'))['article_id']
        user = Users.query.filter_by(user_id=user_id).first()
        if user:
            es = ElasticStorage.get_instance(dev=False)
            doc = ESArticle.get(article_id)
            user.anger += doc.tone.anger
            user.disgust += doc.tone.disgust
            user.fear += doc.tone.fear
            user.joy += doc.tone.anger
            user.sadness += doc.tone.anger
            user.total_articles += 1
        else:
            u = Users(user_id, article_id)
            db.session.add(u)
        db.session.commit()
        return ('', 204)


app.add_url_rule('/users/', view_func=UserAPI.as_view('users'))

class ArticlesAPI(MethodView):
    def get(self):
        all_articles = Articles.query.all()
        return json.dumps([x.to_dict() for x in all_articles])


    def post(self):
        article_id = json.loads(request.data.decode('utf-8'))['article_id']
        article = Articles.query.filter_by(article_id=article_id).first()
        if article:
            article.clicks += 1
            db.session.add(article)
        else:
            a = Articles(article_id)
            db.session.add(a)

        db.session.commit()
        return ('', 204)

app.add_url_rule('/articles/', view_func=ArticlesAPI.as_view('articles'))

@app.route('/search')
def search():
    query = request.args.get('q', '')

    es = ElasticStorage.get_instance(dev=False)
    r = RedisClient.get_instance(dev=False)

    if r.hexists('popular', query.lower()):
        r.hincrby('popular', query.lower())
    else:
        r.hset('popular', query.lower(), 1)

    articles = es.query_articles(query)
    articles = list(articles)
    articles = list({article['title']:article for article in articles}.values())

    for article in articles:
        for key, value in source_map.items():
            if key in article['url']:
                article['source'] = value
    return jsonify(
        articles=articles
    )


@app.route('/popular')
def popular():
    r = RedisClient.get_instance(dev=False)
    pop = r.hgetall('popular')
    sorted_searches = sorted(pop.items(), key=lambda x:int(x[1]), reverse=True)[0:10]

    final_dict = {}
    for sorted_search in sorted_searches:
        final_dict[sorted_search[0].decode('utf-8')] = int(sorted_search[1].decode('utf-8'))

    return jsonify(final_dict)


if __name__ == "__main__":
    port = os.getenv('VCAP_APP_PORT', '5000')
    app.run(host='0.0.0.0', port=int(port), debug=True)
