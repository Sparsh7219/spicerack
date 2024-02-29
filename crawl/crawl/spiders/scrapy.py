from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class CrawlingSpider(CrawlSpider):
    name="food"
    allowed_domains=["food.com"]
    start_urls=["https://www.food.com/",
                "https://www.food.com/ideas/top-recipes-for-kids-6975?ref=nav#c-811546",
                "https://www.food.com/ideas/summer-cocktails-drinks-6268?ref=nav#c-517255"
                "https://www.food.com/ideas/best-instant-pot-recipes-6928?ref=nav#c-789324"
                ]

    rules=(
        Rule(LinkExtractor(allow=r"/recipe/[^/]+$"), callback="parse_item"),
    )
    

    def parse_item(self,response):
        # Extracting ingredients with quantity and link
       
        ingredients = []
        ingredient_items = response.css("ul.ingredient-list.svelte-1dqq0pw li")

        for item in ingredient_items:
            quantity = item.css("span.ingredient-quantity.svelte-1dqq0pw::text").get()
            ingredient_text = ' '.join(item.css("span.ingredient-text::text").getall())
            ingredient_name = item.css("span.ingredient-text.svelte-1dqq0pw a::text").get()
            ingredient = f"{quantity} {ingredient_text} {ingredient_name}".strip().replace("\n", '').replace('  ', '')
            ingredients.append(ingredient)


        # Cleaning up the ingredients list
        ingredients = [ingredient.strip() for ingredient in ingredients if ingredient.strip()]

        directions = response.css("ul.direction-list.svelte-1dqq0pw li.direction.svelte-1dqq0pw::text").getall()
        # Cleaning up the directions list
        directions = [direction.strip() for direction in directions if direction.strip()]

        
        # Extract the src attribute value of the img tag
        
        image_url = response.css('img.only-desktop::attr(src)').get()

        yield{            
            
            "title":response.css(".title h1::text").get(),
            "ingredients":ingredients,
            "direction":directions,
            'image_url': image_url

        }
	



	