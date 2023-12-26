import requests

url = "https://lichess.org/api/games/user/"
params = {
    "max": 50,
    "clocks": True,
    "perfType": "blitz",
}

def get_games(username):
    r = requests.get(url + username, params=params)
    return r.text
