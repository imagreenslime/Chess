from flask import Blueprint, render_template, request, flash, jsonify
import os
import json

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
def home():
    chess_board = os.path.join(os.path.join('static', 'images'), 'chess-board.png')
    return render_template("home.html", user_image=chess_board)