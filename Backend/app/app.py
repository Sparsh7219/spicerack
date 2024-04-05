from flask import Flask, render_template, session, redirect, url_for
from routes.search_routes import bp as search_bp
from routes.login_routes import bp as login_bp
import os
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Change this to your own secret key
CORS(app)
CORS(app,resources={r"/api/*":{"origin":"http://localhost:5173"}})

app.register_blueprint(search_bp)
app.register_blueprint(login_bp)

@app.route('/api/home')
def search():
    if not request.args:
        return jsonify({'recipes': [], 'count':0})

    # return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
