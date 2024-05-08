from flask import Blueprint, request, jsonify, render_template
from models.search_models import unique_ingredients, DEFAULT_INGREDIENTS, search_recipes_by_ingredients, \
    search_recipes_by_name, recipes, find_missing_ingredients

bp = Blueprint("search_routes", __name__)


@bp.route('/api/home')
def index():
    return render_template('index.html', ingredients=unique_ingredients, recipes=recipes)

@bp.route('/api/search', methods=['GET'])
def search_recipes():
    user_ingredients = request.args.get('ingredients')
    recipe_name = request.args.get('recipe_name')

    if user_ingredients:
        user_ingredients = user_ingredients.split(',')
        user_ingredients.extend(DEFAULT_INGREDIENTS)  # Add default ingredients

        matching_recipes = search_recipes_by_ingredients(recipes, user_ingredients)

        if matching_recipes:
            return jsonify({'count': len(matching_recipes), 'recipes': matching_recipes})
        else:
            return jsonify({'message': 'No recipes found containing those ingredients.'}), 404
    elif recipe_name:
        matching_recipes = search_recipes_by_name(recipes, recipe_name)

        if matching_recipes:
            return jsonify({'count': len(matching_recipes), 'recipes': matching_recipes})
        else:
            return jsonify({'message': 'No recipes found with that name.'}), 404
    else:
        return jsonify({'message': 'Please provide ingredients or a recipe name to search for recipes.'}), 400

@bp.route('/api/missing-ingredients', methods=['POST'])
def get_missing_ingredients():
    data = request.get_json()
    user_ingredients = data.get('user_ingredients', [])
    recipe_ingredients = data.get('recipe_ingredients', [])

    if not user_ingredients or not recipe_ingredients:
        return jsonify({'error': 'Please provide user ingredients and recipe ingredients.'}), 400

    missing_ingredients = find_missing_ingredients(user_ingredients, recipe_ingredients)
    return jsonify({'missing_ingredients': missing_ingredients})