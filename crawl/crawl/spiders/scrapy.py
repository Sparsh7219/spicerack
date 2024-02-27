from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class CrawlingSpider(CrawlSpider):
    name="food"
    allowed_domains=["food.com"]
    start_urls=["https://www.food.com/",
                "https://www.food.com/ideas/top-recipes-for-kids-6975?ref=nav#c-811546"
                ]

    rules=(
        Rule(LinkExtractor(allow=r"/recipe/[^/]+$"), callback="parse_item"),
        Rule(LinkExtractor(allow=r"/recipes/\?pn=\d+"), follow=True),
    )
    

    def parse_item(self,response):
        yield{
            "title":response.css(".title h1::text").get(),
            "direction":response.css(".directions__title::text").get(),
            "ingredients":response.css(".ingredients__title::text").get()
        }
