from elasticsearch_dsl import Search, Q
from elasticsearch_dsl.connections import connections
from elasticsearch_dsl import DocType, String, Integer


class ElasticStorage:
    _instance = None

    def __init__(self, url):
        self.url = url
        connections.create_connection(hosts=[self.url])

    @classmethod
    def get_instance(cls, dev=True) -> 'ElasticStorage':
        if cls._instance is None:
            if dev:
                cls._instance = cls(url='http://172.17.0.2:9200')
            else:
                cls._instance = cls(url='http://134.168.38.217:9200')
        return cls._instance

    def query_articles(self, query):
        client = connections.get_connection()
        search = Search(using=client, index='articles')
        q = Q('match', body=query)
        search = search.query(q)
        search.execute()
        for hit in search:
            yield {
                'title': hit.title,
                'body': hit.body,
                'url': hit.url,
                'top_image': hit.top_image
            }