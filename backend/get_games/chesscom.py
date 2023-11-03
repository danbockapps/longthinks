import requests
from datetime import datetime as dt
from dateutil.relativedelta import relativedelta


def get_games(username):
    now = dt.now()
    y = str(now.year)
    m = str(now.month).zfill(2)
    url = f"https://api.chess.com/pub/player/{username}/games/{y}/{m}/pgn"
    r = requests.get(url, headers={"user-agent": "nate.solon@gmail.com"})
    pgn = r.text
    games = pgn.split("\n\n\n")
    if len(games) < 10:
        lastmonth = now - relativedelta(months=1)
        y = str(lastmonth.year)
        m = str(lastmonth.month).zfill(2)
        url = f"https://api.chess.com/pub/player/{username}/games/{y}/{m}/pgn"
        r = requests.get(url, headers={"user-agent": "nate.solon@gmail.com"})
        pgn += r.text
    return pgn