import stalemate from "./stalemate";
import white_has_won from "./white_has_won";
import black_has_won from "./black_has_won";

export default function update_winner(squares, board) {

    board = board.slice();

    if (stalemate(squares, board)) {
        board[1] = "stalemate";
    }
    else if (white_has_won(squares, board)) {
        board[1] = "white";
    }
    else if (black_has_won(squares, board)) {
        board[1] = "black";
    }

    return board
}