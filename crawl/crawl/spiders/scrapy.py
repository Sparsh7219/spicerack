from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class CrawlingSpider(CrawlSpider):
    name="food"
    allowed_domains=["food.com"]
    start_urls=["https://www.food.com/",
                #"https://www.food.com/ideas/top-recipes-for-kids-6975?ref=nav#c-811546"
                ]

    rules=(
        Rule(LinkExtractor(allow=r"/recipe/[^/]+$"), callback="parse_item"),
    )
    

    def parse_item(self,response):
        ingredients = []
        # Extracting ingredients with quantity and link
        """"ingredient_elements = response.css("ul.ingredient-list.svelte-1dqq0pw li")
        for ingredient_element in ingredient_elements:
            quantity = ingredient_element.css("span.ingredient-quantity.svelte-1dqq0pw::text").get()
            link = ingredient_element.css("span.ingredient-text.svelte-1dqq0pw a::attr(href)").get()
            ingredient_text = ingredient_element.css("span.ingredient-text.svelte-1dqq0pw::text").get()
            # Combining quantity and ingredient text
            if quantity:
                ingredient = f"{quantity.strip()} {ingredient_text.strip()}"
            else:
                ingredient = ingredient_text.strip()
            # Adding the link if available
            if link:
                ingredient += f" ({response.urljoin(link)})"
            ingredients.append(ingredient)"""
        ingredients = []
        ingredient_items = response.css("ul.ingredient-list.svelte-1dqq0pw li")

        for item in ingredient_items:
            quantity = item.css("span.ingredient-quantity.svelte-1dqq0pw::text").get()
            ingredient_text = item.css("span.ingredient-text::text").getall()
            ingredient_name = item.css("span.ingredient-text.svelte-1dqq0pw a::text").get()
            ingredients.append(f"{quantity} {ingredient_text} {ingredient_name}")


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
	



	