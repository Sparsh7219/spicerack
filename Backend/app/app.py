from flask import Flask, render_template, session, redirect, url_for
from flask_restful import Api

app = Flask(__name__)


if __name__ == '__main__':
    app.run(debug=True)
