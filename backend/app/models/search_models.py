import json

# Function to load recipes from a JSON file
def load_recipes_from_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        recipes = json.load(file)
    return recipes

# Function to search recipes by ingredients
def search_recipes_by_ingredients(recipes, user_ingredients):
    matching_recipes = []
    for recipe in recipes:
        if set(user_ingredients).issuperset(set(recipe['ingredients'])):
            matching_recipes.append(recipe)
    return matching_recipes

# Extract unique ingredients from recipes
def get_unique_ingredients(recipes):
    ingredients = set()
    for recipe in recipes:
        ingredients.update(recipe['ingredients'])
    return list(ingredients)

# Default ingredients
DEFAULT_INGREDIENTS = ['salt', 'pepper', 'oil','butter','sugar','water','garam masala',
                       'pepper','black pepper','turmeric','chili powder','chili pepper','turmeric powder','ghee'
                       ]

# Load recipes
recipes = load_recipes_from_file(r'recipes\recipes.json')

# Get unique ingredients for dropdown
unique_ingredients = get_unique_ingredients(recipes)