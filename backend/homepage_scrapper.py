import requests
from lxml import html


def scrap_huffingtonpost_website():
    response = requests.get('http://www.huffingtonpost.com/')
    tree = html.fromstring(response.text)

    #Finding all anchor tags in response
    links = tree.xpath('//a/@href')

    real_links = filter(lambda x: x.startswith('http://www.huffingtonpost.com/'), links) # Remove all the other stuff
    real_links = list(set(real_links)) # Remove dups
    real_links = filter(lambda x: x.endswith('.html'), real_links) # Take only articles
    real_links = filter(lambda x: not x.startswith('http://www.huffingtonpost.com/p/'), real_links) # Remove the FAQs and about
    print('\n'.join(real_links))


if __name__ == '__main__':
    scrap_huffingtonpost_website()
