import requests
from datetime import datetime as dt


def get_games(username):
    now = dt.now()
    y = str(now.year)
    m = str(now.month).zfill(2)
    url = f"https://api.chess.com/pub/player/{username}/games/{y}/{m}/pgn"
    r = requests.get(url, headers={"user-agent": "nate.solon@gmail.com"})
    return r.text