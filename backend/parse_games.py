import chess
import chess.pgn
import io
import numpy as np


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
        tc = game.headers['TimeControl'].split("+")
        if len(tc) > 1:
            start = int(tc[0])
            inc = int(tc[1])
            secs = start + (40 * inc)
        else:
            secs = int(tc[0])
        thresh = secs / 10
        node = game.next()
        time = node.clock()
        while node is not None:
            if node.ply() % 2 == color:
                new_time = node.clock()
                if time - new_time > thresh:
                    move = node.move
                    san_move = node.parent.board().san(move)
                    orig_sq = chess.square_name(node.parent.move.from_square)
                    dest_sq = chess.square_name(node.parent.move.to_square)
                    time_spent = round(time - new_time)
                    thinks.append((game_id, node.ply(), node.parent.board().fen(), san_move, orig_sq, dest_sq, time_spent))
                time = new_time
            node = node.next()
    return {"thinks": thinks}