from flask import Blueprint, render_template, request, redirect, session, jsonify, current_app
from models.login_models import *

bp = Blueprint('routes', __name__)


@bp.route('/items')
def display_items():
    items = load_items()
    return render_template('items.html', items=items)

@bp.route('/signup', methods=['GET', 'POST'])
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
            return "Username already exists. Please choose a different username."
        if existing_email:
            return "Email address already in use. Please use a different email address."

        # Encrypt the password
        encrypted_password = encrypt_password(password)

        # Insert new user into the database
        cursor.execute("INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)", (username, email, encrypted_password))
        db.commit()

        # Redirect to login page after successful signup
        return redirect('/login')
    else:
        # If it's a GET request, render the signup page
        return render_template('signup.html')

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        # If it's a GET request, render the login page
        return render_template('login.html')
    elif request.method == 'POST':
        # If it's a POST request, handle the form submission
        username = request.form['username']
        password = request.form['password']
        encrypted_password = encrypt_password(password)

        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE username = %s AND password_hash = %s",
                       (username, encrypted_password))
        user = cursor.fetchone()

        if user:
            # If login successful, set the username in the session
            session['username'] = user['username']
            # Redirect to the previous page or items page after login
            return redirect(session.get('next') or '/items')
        else:
            return "Invalid username or password"

@bp.route('/add_to_favorites/<int:item_id>', methods=['POST'])
def add_to_favorites(item_id):
    if 'username' not in session:
        # If user is not logged in, redirect to login page
        return redirect('/login')

    username = session['username']

    # Load existing favorites for the current user
    favorites = load_favorites(username)

    # Check if the item is already in favorites for the current user
    for item in favorites:
        if item['id'] == item_id:
            return "Item already in favorites"

    # Fetch the item details from the items list
    items = load_items()
    item_details = next((item for item in items if item['id'] == item_id), None)

    if item_details:
        # Add the item to favorites for the current user
        favorites.append(item_details)

        # Save the updated favorites for the current user
        save_favorites(username, favorites)

        return redirect('/favorites')
    else:
        return "Item not found"

@bp.route('/remove_from_favorites/<int:item_id>', methods=['POST'])
def remove_from_favorites(item_id):
    if 'username' not in session:
        # If user is not logged in, redirect to login page
        return redirect('/login')

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
            return redirect('/favorites')

    return "Item not found in favorites"

@bp.route('/favorites')
def favorites():
    if 'username' not in session:
        return redirect('/login')

    username = session['username']

    # Load user's favorites
    favorite_items = load_favorites(username)

    return render_template('favorites.html', favorite_items=favorite_items)
