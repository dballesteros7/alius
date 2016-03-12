from elasticsearch_dsl import Search, Q
from elasticsearch_dsl.connections import connections
from elasticsearch_dsl import DocType, String, Integer


class Query(DocType):
    class Meta:
        index = 'queries'
    query_string = String()
    count = Integer()


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

    def store_query(self, query_string):
        query_string = query_string.lower()
        # check if the query string exists
        client = connections.get_connection()
        search = Search(using=client, index='queries') \
                 .query("match", query_string=query_string)
        search.execute()
        if search:
            # if found increment the count
            search.count += 1
        else:
            # create a query object
            es_query = Query(
                query_string=query_string,
                count=1
            )
            es_query.save()

    def get_top_queries(self):
        client = connections.get_connection()
        search = Search(using=client, index='queries') \
                 .sort('-count')
        search = search[1:10]
        for hit in search:
            yield {
                'query': hit.query_string
            }


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