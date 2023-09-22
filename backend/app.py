from flask import Flask

from get_games.lichess import get_games as get_lichess_games
from get_games.chesscom import get_games as get_chesscom_games
from parse_games import parse_games

app = Flask(__name__)

def get_games(user, site):
    if site == "lichess":
        return get_lichess_games(user)
    elif site == "chesscom":
        return get_chesscom_games(user)

@app.route('/<user>/<site>')
def get_thinks(user, site):
    pgn = get_games(user, site)
    thinks = parse_games(pgn, user, site)
    return thinks

if __name__ == '__main__':
    app.run(port=5001, debug=True)
