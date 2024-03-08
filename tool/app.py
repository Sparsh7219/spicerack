from flask import Flask, request, jsonify, render_template
import json

app = Flask(__name__)

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
DEFAULT_INGREDIENTS = ['salt', 'pepper', 'oil', 'onion', 'garlic','butter','sugar','tomato','water','garam masala']

# Load recipes
recipes = load_recipes_from_file('recipes.json')

# Get unique ingredients for dropdown
unique_ingredients = get_unique_ingredients(recipes)

@app.route('/')
def index():
    return render_template('index.html', ingredients=unique_ingredients)

@app.route('/search', methods=['GET'])
def search_recipes():
    user_ingredients = request.args.get('ingredients')
    if user_ingredients:
        user_ingredients = user_ingredients.split(',')
        user_ingredients.extend(DEFAULT_INGREDIENTS)  # Add default ingredients

        matching_recipes = search_recipes_by_ingredients(recipes, user_ingredients)

        if matching_recipes:
            return jsonify({'count': len(matching_recipes), 'recipes': matching_recipes})
        else:
            return jsonify({'message': 'No recipes found containing those ingredients.'}), 404
    else:
        return jsonify({'message': 'Please provide ingredients to search for recipes.'}), 400

if __name__ == "__main__":
    app.run(debug=True)
