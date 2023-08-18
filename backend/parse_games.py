import chess
import chess.pgn
import io
import numpy as np


THRESHOLD = 15


def get_color(headers, name):
    if headers["White"].lower() == name.lower():
        return chess.WHITE
    elif headers["Black"].lower() == name.lower():
        return chess.BLACK
    else:
        raise Exception("Player not in game")
    

def parse_games(pgn, user):
    thinks = []
    games = pgn.split("\n\n\n")[:-1]
    for game in games:
        game = chess.pgn.read_game(io.StringIO(game))
        game_id = game.headers["Site"]
        times = []
        node = game.next()
        while node is not None:
            times.append(node.clock())
            node = node.next()
        color = get_color(game.headers, user)
        times = times[(1 - color)::2]
        diffs = -np.diff(times)
        tanks, = np.where(diffs > THRESHOLD)
        tanks += 1
        ply = tanks * 2
        if not color:
            ply += 1
        thinks += [(game_id, int(p)) for p in ply]
    return {"thinks": thinks}
