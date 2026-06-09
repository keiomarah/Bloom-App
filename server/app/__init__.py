from flask import Flask
from .extensions import db, jwt
from dotenv import load_dotenv
import os
from .routes.auth import auth
from .routes.journal import journal
from .config import Config
from flask_cors import CORS
load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"]= os.getenv("SECRET_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config.from_object(Config)
    db.init_app(app)
    jwt.init_app(app)
    cors = CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"], supports_credentials=True)

    app.register_blueprint(auth, url_prefix="/auth")
    app.register_blueprint(journal, url_prefix="/journal")

    create_database(app)
    return app

def create_database(app):
    with app.app_context():
        db.create_all()