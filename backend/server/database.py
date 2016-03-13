import json

import redis
from elasticsearch import ConnectionTimeout
from elasticsearch_dsl import Search, Q
from elasticsearch_dsl.connections import connections
from article import Article

from submod import select_k_and_sort
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

    def query_articles(self, query, prefs):
        client = connections.get_connection()
        search = Search(using=client, index='articles')
        q = Q('bool', must=[Q('exists', field='watson_analyzed'),
                            Q('match', watson_success=True),
                            Q('match', body=query)])
        search = search.query(q)
        search.execute()
        documents = []
        for hit in search[:100]:
            if '#' not in hit.url and '?' not in hit.url:
                documents.append({
                    'id': hit.meta.id,
                    'title': hit.title,
                    'body': hit.body,
                    'url': hit.url,
                    'score': hit.meta.score,
                    'tone': dict(
                        joy=hit.tone.joy,
                        fear=hit.tone.fear,
                        sadness=hit.tone.sadness,
                        disgust=hit.tone.disgust,
                        anger=hit.tone.anger
                    ),
                    'top_image': hit.top_image
                })
        if len(documents) < 10:
            return documents
        else:
            return select_k_and_sort(documents, prefs)


    def update_sentiments(self):
        from watson_developer_cloud import ToneAnalyzerV3Beta
        tone_analyzer = ToneAnalyzerV3Beta(username='03774a07-f588-4619-8801-506d251f384b',
                                   password='kkxjxbSSypDJ',
                                   version='2016-02-11')
        client = connections.get_connection()
        search = Search(using=client, index='articles', doc_type='article')
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
            print(counter)
        if counter == 0:
            raise RealError()


class RealError(Exception):
    pass


def main():

    while True:
        es = ElasticStorage.get_instance(dev=False)
    # for doc in es.query_articles('Republican Party'):
        #print(doc)
        try:
            es.update_sentiments()
        except RealError:
            print('done')
            return
        except Exception:
            print('Crashed')


if __name__ == '__main__':
    main()
