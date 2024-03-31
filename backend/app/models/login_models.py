from flask import current_app, session
import mysql.connector
import hashlib
import os
import json

db = None

def get_db():
    global db
    if db is None:
        db = mysql.connector.connect(
            host="localhost",
            user="root",
            database="user_db"
        )
    return db

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


def get_current_user_id():
    return session.get('user_id')