from flask import Flask

from get_games.lichess import get_games
from parse_games import parse_games

app = Flask(__name__)

@app.route('/<user>')
def get_thinks(user):
    pgn = get_games(user)
    thinks = parse_games(pgn, user)
    return thinks

if __name__ == '__main__':
    app.run(port=5001, debug=True)
