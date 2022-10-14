from flask import Flask
from os import path
import os

app = Flask(__name__)

def create_app():
    app.config["SECRET_KEY"] = "awdjthfrelwhjkHFLIUEWH"

    from .views import views

    app.register_blueprint(views, url_prefix = '/')

    return app
