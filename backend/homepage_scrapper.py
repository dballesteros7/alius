import newspaper
from storage.elastic import ElasticStorage


def scrap_huffingtonpost_website():
    h_paper = newspaper.build('http://chicagotribune.com',
                              memoize_articles=False)
    h_paper.download_articles()
    h_paper.parse_articles()
    es = ElasticStorage.get_instance()
    es.store_articles(h_paper.articles, h_paper.url)


if __name__ == '__main__':
    scrap_huffingtonpost_website()
