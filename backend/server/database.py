import json

import redis
from elasticsearch_dsl import Search, Q
from elasticsearch_dsl.connections import connections
from article import Article
from watson_developer_cloud import WatsonException


class RedisClient:
    _instance = None

    @classmethod
    def get_instance(cls, dev=True):
        if cls._instance is None:
            if dev:
                cls._instance = redis.StrictRedis(host='localhost', port=6379, db=0)
            else:
                cls._instance = redis.StrictRedis(host='134.168.40.230', port=6379, db=0)
        return cls._instance


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
        q = Q('bool', must=[Q('exists', field='watson_analyzed'),
                            Q('match', watson_success=True),
                            Q('match', body=query)])
        search = search.query(q)
        search.execute()
        for hit in search:
            if '#' not in hit.url and '?' not in hit.url:
                yield {
                    'id': hit.meta.id,
                    'title': hit.title,
                    'body': hit.body,
                    'url': hit.url,
                    'tone': dict(
                        joy=hit.tone.joy,
                        fear=hit.tone.fear,
                        sadness=hit.tone.sadness,
                        disgust=hit.tone.disgust,
                        anger=hit.tone.anger
                    ),
                    'top_image': hit.top_image
                }

    def update_sentiments(self):
        from watson_developer_cloud import ToneAnalyzerV3Beta
        tone_analyzer = ToneAnalyzerV3Beta(username='03774a07-f588-4619-8801-506d251f384b',
                                   password='kkxjxbSSypDJ',
                                   version='2016-02-11')
        client = connections.get_connection()
        search = Search(using=client, index='articles')
        q = Q('bool', must=[Q('missing', field='watson_analyzed')])
        search = search.query(q)
        counter = 0
        for result in search.scan():
            doc = Article.get(result.meta.id)
            try:
                analysis = tone_analyzer.tone(text=doc.body)
                tone_categories = analysis['document_tone']['tone_categories']
                emotion_tones = list(filter(lambda x: x['category_id'] == 'emotion_tone', tone_categories))[0]
                doc.tone = {}
                for tone in emotion_tones['tones']:
                    doc.tone[tone['tone_id']] = tone['score']
                doc.watson_success = True
            except WatsonException:
                continue
            finally:
                doc.watson_analyzed = True
                doc.save()
                counter += 1
            if counter % 100 == 0:
                print(counter)

def main():
    es = ElasticStorage.get_instance(dev=False)
    for doc in es.query_articles('true'):
        print(doc)

if __name__ == '__main__':
    main()
