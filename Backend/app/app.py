from flask import Flask, render_template, session, redirect, url_for
from routes.search_routes import bp as search_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app,resources={r"/*":{"origins":"*"}})

app.register_blueprint(search_bp)

@app.route('/')
def search():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
