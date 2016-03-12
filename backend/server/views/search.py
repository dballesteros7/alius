from flask import request, jsonify

from server.entry_point import app
from storage.elastic import ElasticStorage


@app.route('/search')
def search():
    query = request.args.get('q', '')
    client = ElasticStorage.get_instance()
    articles = client.query_articles(query)
    return jsonify(
        articles=list(articles)
    )
