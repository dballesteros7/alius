import newspaper
import logging

from storage.elastic import ElasticStorage
from newspaper import news_pool
from itertools import zip_longest


def grouper(iterable, n, fillvalue=None):
    "Collect data into fixed-length chunks"
    # grouper('ABCDEFG', 3, 'x') --> ABC DEF GXX
    args = [iter(iterable)] * n
    return zip_longest(*args, fillvalue=fillvalue)


def scrape_website(urls):
    papers = []
    for url in urls:
        if url:
            papers.append(newspaper.build(url, memoize_articles=False))

    for paper in papers:
        delete_queue = [] # articles to be deleted
        for article in paper.articles:
            if 'video' in article.url or 'videos' in article.url:
                delete_queue.append(article)

        for article in delete_queue:
            paper.articles.remove(article)

    news_pool.set(papers, threads_per_source=2) # (2*2) = 4 threads in all
    news_pool.join()

    for paper in papers:
        paper.parse_articles()

    es = ElasticStorage.get_instance(dev=False)
    for paper in papers:
        es.store_articles(paper.articles, paper.url)


if __name__ == '__main__':
    # setup logging
    logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s [%(levelname)s] %(message)s')

    news_sites = ['http://cnn.com', 'http://nytimes.com', 'http://huffingtonpost.com', 'http://theguardian.com',
                  'http://foxnews.com', 'http://forbes.com', 'http://timesofindia.indiatimes.com',
                  'http://bbc.co.uk/news/', 'http://usatoday.com', 'http://bloomberg.com', 'http://wsj.com',
                  'http://reuters.com', 'http://nbcnews.com', 'http://money.cnn.com', 'http://indianexpress.com',
                  'http://cbsnews.com', 'http://abcnews.go.com', 'http://latimes.com', 'http://time.com',
                  'http://nypost.com', 'http://cnbc.com', 'http://thehindu.com', 'http://chron.com',
                  'http://theatlantic.com', 'http://breitbart.com', 'http://sfgate.com', 'http://usnews.com',
                  'http://hindustantimes.com', 'http://hollywoodreporter.com', 'http://fortune.com',
                  'http://chicagotribune.com', 'http://news.com.au']

    for urls in grouper(news_sites, 2):
        logging.info('Scraping: {}'.format(urls))
        scrape_website(urls)