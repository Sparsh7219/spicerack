from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class CrawlingSpider(CrawlSpider):
    name="food"
    allowed_domains=["food.com"]
    start_urls=["https://www.food.com/"]

    rules=(
        Rule(LinkExtractor(allow="recipe")),
    )
