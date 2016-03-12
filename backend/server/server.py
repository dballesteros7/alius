import os
from flask import Flask, request, jsonify
from flask.ext.cors import CORS
from elastic import ElasticStorage

app = Flask(__name__)
CORS(app)

source_map = {
    'cnn.com': 'CNN', 'nytimes.com': 'New York Times',
    'huffingtonpost.com': 'The Huffington Post', 'theguardian.com': 'The Guardian',
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


@app.route('/search')
def search():
    query = request.args.get('q', '')
    client = ElasticStorage.get_instance(dev=False)
    articles = client.query_articles(query)
    articles = list(articles)
    for article in articles:
        for key, value in source_map.items():
            if key in article['url']:
                article['source'] = value
    return jsonify(
        articles=articles
    )


@app.route('/popular')
def popular():
    pass


if __name__ == "__main__":
    port = os.getenv('VCAP_APP_PORT', '5000')
    app.run(host='0.0.0.0', port=int(port), debug=True)
