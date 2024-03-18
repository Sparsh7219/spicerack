from flask import Flask, request, jsonify, render_template,Blueprint
from models.search_models import unique_ingredients,DEFAULT_INGREDIENTS,search_recipes_by_ingredients,recipes

bp = Blueprint("search_routes", __name__)

@bp.route('/')
def index():
    return render_template('index.html', ingredients=unique_ingredients)

@bp.route('/search', methods=['GET'])
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