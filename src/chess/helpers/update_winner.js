import stalemate from "./stalemate";
import white_has_won from "./white_has_won";
import black_has_won from "./black_has_won";

export default function update_winner(white_positions, black_positions, squares, board) {

    board = board.slice();

    if (stalemate(white_positions, black_positions, squares, board)) {
        board[1] = "stalemate";
    }
    else if (white_has_won(white_positions, black_positions, squares, board)) {
        board[1] = "white";
    }
    else if (black_has_won(white_positions, black_positions, squares, board)) {
        board[1] = "black";
    }

    return board
}