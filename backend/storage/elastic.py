from elasticsearch_dsl import Search, Q
from elasticsearch_dsl.connections import connections
from storage.article import Article


class ElasticStorage:
    _instance = None

    def __init__(self, url):
        self.url = url
        connections.create_connection(hosts=[self.url])
        Article.init()

    @classmethod
    def get_instance(cls, dev=True) -> 'ElasticStorage':
        if cls._instance is None:
            if dev:
                cls._instance = cls(url='http://172.17.0.2:9200')
            else:
                cls._instance = cls(url='http://134.168.38.217:9200')
        return cls._instance

    def store_articles(self, downloaded_articles, source):
        for article in downloaded_articles:
            es_article = Article(
                title=article.title,
                url=article.url,
                top_image=article.top_image,
                body=article.text,
                source=source
            )
            es_article.save()

    def query_articles(self, query):
        client = connections.get_connection()
        search = Search(using=client)
        q = Q('match', body=query)
        search = search.query(q)
        search.execute()
        for hit in search:
            yield {
                'title': hit.title,
                'body': hit.body,
                'top_image': hit.top_image
            }


def main():
    es = ElasticStorage.get_instance()


if __name__ == '__main__':
    main()

