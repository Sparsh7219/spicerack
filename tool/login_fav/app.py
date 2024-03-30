from flask import Flask, render_template, request, redirect, session, url_for, jsonify
import hashlib
import mysql.connector
import os
import re
import json

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Change this to your own secret key

db = mysql.connector.connect(
    host="localhost",
    user="root",
    database="user_db"
)

def encrypt_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Function to load items from JSON file
def load_items():
    try:
        with open('static/items.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

# Function to load favorites from JSON file
def load_favorites(username):
    try:
        with open(f'static/{username}_favorites.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

# Function to save favorites to JSON file
def save_favorites(username, favorites):
    with open(f'static/{username}_favorites.json', 'w') as file:
        json.dump(favorites, file)

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/dummy')
def dummy():
    return "Login successful. This is a dummy page."

@app.route('/items')
def display_items():
    items = load_items()
    return render_template('items.html', items=items)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # Extract username, email, and password from the form
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        # Check if username or email is already taken
        cursor = db.cursor(dictionary=True)
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


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        # If it's a GET request, render the login page
        return render_template('login.html')
    elif request.method == 'POST':
        # If it's a POST request, handle the form submission
        username = request.form['username']
        password = request.form['password']
        encrypted_password = encrypt_password(password)

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

# Add a route to handle adding items to favorites
@app.route('/add_to_favorites/<int:item_id>', methods=['POST'])
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
    
@app.route('/remove_from_favorites/<int:item_id>', methods=['POST'])
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


@app.route('/favorites')
def favorites():
    if 'username' not in session:
        return redirect('/login')

    username = session['username']

    # Load user's favorites
    favorite_items = load_favorites(username)

    return render_template('favorites.html', favorite_items=favorite_items)

if __name__ == '__main__':
    app.run(debug=True)
