from flask import Flask
from flask_cors import CORS
from db import db

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app) # Initialize the SQLAlchemy object with the Flask app

    return app
