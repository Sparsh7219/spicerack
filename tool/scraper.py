import requests
from bs4 import BeautifulSoup

# Function to scrape recipe titles from a single page
def scrape_page(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    titles = soup.find_all("div",attrs={"class":"current-recipe"})
    for title in titles:
        print(title.text.split())

# Main function
if __name__ == "__main__":
    base_url = "https://www.food.com/recipe/chicken-tikka-masala-394639"
    scrape_page(base_url)
