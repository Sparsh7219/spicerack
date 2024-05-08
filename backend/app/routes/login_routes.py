from flask import Blueprint, render_template, request, redirect, session, jsonify
from models.login_models import *

bp = Blueprint('login_routes', __name__)


@bp.route('/api/items')
def display_items():
    items = load_items()
    return jsonify({'items': items})


@bp.route('/api/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        # Extract username, email, and password from the form
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        db = get_db()
        cursor = db.cursor(dictionary=True)

        # Check if username or email is already taken
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        existing_username = cursor.fetchone()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        existing_email = cursor.fetchone()

        if existing_username:
            return jsonify({'message': "Username already exists. Please choose a different username."})
        if existing_email:
            return jsonify({'message': "Email address already in use. Please use a different email address."})

        # Encrypt the password
        encrypted_password = encrypt_password(password)

        # Insert new user into the database
        cursor.execute("INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)",
                       (username, email, encrypted_password))
        db.commit()

        # Redirect to login page after successful signup
        return jsonify({'message': 'Signup successful', 'redirect': '/api/login'})
    else:
        return jsonify({'message': 'Method not allowed'})


@bp.route('/api/login', methods=['POST'])
def login():
    if request.method == 'POST':
        # If it's a POST request, handle the form submission
        username = request.form['username']
        password = request.form['password']
        encrypted_password = encrypt_password(password)

        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT id, username FROM users WHERE username = %s AND password_hash = %s",
                       (username, encrypted_password))
        user = cursor.fetchone()

        if user:
            # If login successful, set the username and user_id in the session
            session['username'] = user['username']
            session['user_id'] = user['id']
            # Redirect to the previous page or items page after login
            return jsonify({'message': 'Login successful', 'redirect': session.get('next') or '/api/items'})
        else:
            return jsonify({'message': 'Invalid username or password'})
    else:
        return jsonify({'message': 'Method not allowed'})


@bp.route('/api/add_to_favorites/<int:item_id>', methods=['POST'])
def add_to_favorites(item_id):
    if 'username' not in session:
        # If user is not logged in, redirect to login page
        return jsonify({'message': 'User not logged in', 'redirect': '/api/login'})

    username = session['username']

    # Load existing favorites for the current user
    favorites = load_favorites(username)

    # Check if the item is already in favorites for the current user
    for item in favorites:
        if item['id'] == item_id:
            return jsonify({'message': 'Item already in favorites'})

    # Fetch the item details from the items list
    items = load_items()
    item_details = next((item for item in items if item['id'] == item_id), None)

    if item_details:
        # Add the item to favorites for the current user
        favorites.append(item_details)

        # Save the updated favorites for the current user
        save_favorites(username, favorites)

        return jsonify({'message': 'Item added to favorites', 'redirect': '/api/favorites'})
    else:
        return jsonify({'message': 'Item not found'})


@bp.route('/api/remove_from_favorites/<int:item_id>', methods=['POST'])
def remove_from_favorites(item_id):
    if 'username' not in session:
        # If user is not logged in, redirect to login page
        return jsonify({'message': 'User not logged in', 'redirect': '/api/login'})

    username = session['username']

    # Load existing favorites for the current user
    favorites = load_favorites(username)

    # Check if the item is in favorites for the current user
    for item in favorites:
        if item['id'] == item_id:
            # Remove the item from favorites
            favorites.remove(item)
            # Save the updated favorites for the current user
            save_favorites(username, favorites)
            return jsonify({'message': 'Item removed from favorites', 'redirect': '/api/favorites'})

    return jsonify({'message': 'Item not found in favorites'})


@bp.route('/api/favorites')
def favorites():
    if 'username' not in session:
        return jsonify({'message': 'User not logged in', 'redirect': '/api/login'})

    username = session['username']

    # Load user's favorites
    favorite_items = load_favorites(username)

    return jsonify({'favorite_items': favorite_items})


@bp.route('/api/get_current_user_id')
def get_current_user_id_route():
    user_id = get_current_user_id()
    return jsonify({'user_id': user_id})
