import Bishop from "../pieces/Bishop";
import King from "../pieces/King";
import Knight from "../pieces/Knight";
import Pawn from "../pieces/Pawn";
import Queen from '../pieces/Queen.js';
import Rook from '../pieces/Rook.js';
import opposite_player from "../helpers/opposite_player";
import Empty_piece from "../pieces/Empty_piece";

export default function initialize_squares(player, render){
    const squares = Array(64).fill(null);

    for (let i = 8; i < 16; i++) {
        squares[i] = new Pawn(opposite_player(player), player);
        squares[i+40] = new Pawn(player, player);
    }

    squares[0] = new Rook(opposite_player(player));
    squares[7] = new Rook(opposite_player(player));
    squares[56] = new Rook(player);
    squares[63] = new Rook(player);

    squares[1] = new Knight(opposite_player(player));
    squares[6] = new Knight(opposite_player(player));
    squares[57] = new Knight(player);
    squares[62] = new Knight(player);

    squares[2] = new Bishop(opposite_player(player));
    squares[5] = new Bishop(opposite_player(player));
    squares[58] = new Bishop(player);
    squares[61] = new Bishop(player);


    if (player === 1) {
        squares[3] = new Queen(2);
        squares[4] = new King(2);

        squares[59] = new Queen(1);
        squares[60] = new King(1);
    }

    else {
        squares[3] = new King(1);
        squares[4] = new Queen(1);

        squares[59] = new King(2);
        squares[60] = new Queen(2);
    }

    if (render) {
        for (let i = 16; i < 48; i++) {
            squares[i] = new Empty_piece();
        }
    }


    return squares;
}