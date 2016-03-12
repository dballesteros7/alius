from elasticsearch_dsl import DocType, String, Nested, Boolean


class Article(DocType):
    class Meta:
        index = 'articles'
    title = String()
    url = String()
    top_image = String()
    body = String()
    source = String()
    watson_analyzed = Boolean()
    watson_success = Boolean()
    tone = Nested(
        properties={
            'joy': String(),
            'fear': String(),
            'sadness': String(),
            'disgust': String(),
            'anger': String()
        }
    )
