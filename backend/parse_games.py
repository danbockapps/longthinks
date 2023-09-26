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
    

def parse_games(pgn, user, site):
    thinks = []
    games = pgn.split("\n\n\n")[:-1]
    for game in games:
        game = chess.pgn.read_game(io.StringIO(game))
        if site == "lichess":
            game_id = game.headers["Site"]
        elif site == "chesscom":
            game_id = game.headers["Link"]
        color = get_color(game.headers, user)
        node = game.next()
        time = node.clock()
        thinks = []
        while node is not None:
            if node.ply() % 2 == color:
                new_time = node.clock()
                if time - new_time > THRESHOLD:
                    thinks.append((game_id, node.ply(), node.parent.board().fen()))
                time = new_time
            node = node.next()
    return {"thinks": thinks}
