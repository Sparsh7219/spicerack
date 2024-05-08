import json

# Load recipes from input JSON file
with open(r'tool\recipes.json', 'r') as file:
    recipes = json.load(file)

# Extract titles from recipes
titles = [recipe['title'] for recipe in recipes]

# Create a dictionary to store titles
titles_dict = {'titles': titles}

# Write titles to output JSON file
with open('recipe_titles.json', 'w') as file:
    json.dump(titles_dict, file, indent=4)
