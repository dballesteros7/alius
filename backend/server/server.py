import os
from flask import Flask, request, jsonify
from flask.ext.cors import CORS
from elastic import ElasticStorage

app = Flask(__name__)
CORS(app)

def


@app.route('/search')
def search():
    query = request.args.get('q', '')
    client = ElasticStorage.get_instance()
    articles = client.query_articles(query)
    return jsonify(
        articles=list(articles)
    )

@app.route('/top')
def top():
    client = ElasticStorage.get_instance()
    queries = client.get
if __name__ == "__main__":
    port = os.getenv('VCAP_APP_PORT', '5000')
    app.run(host='0.0.0.0', port=int(port))
