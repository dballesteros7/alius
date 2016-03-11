from elasticsearch_dsl import DocType, String, Nested


class Article(DocType):
    class Meta:
        index = 'articles'
    title = String()
    url = String()
    top_image = String()
    body = String()
    source = String()
    tone = Nested(
        properties={
            'joy': String(),
            'fear': String(),
            'sadness': String(),
            'disgust': String(),
            'anger': String()
        }
    )
