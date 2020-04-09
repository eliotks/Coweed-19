import all_legal_moves from "../moves/all_legal_moves";
import king_in_check from "../helpers/king_in_check";


export default function stalemate(white_positions, black_positions, squares, board) {
    if (board[1] === 1) {
        if (all_legal_moves(1, white_positions, black_positions, squares, board).length === 0 && !king_in_check(1, white_positions, black_positions, squares, board)) {
            return true;
        }
    }
    else {
        if (all_legal_moves(2, white_positions, black_positions, squares, board).length === 0 && !king_in_check(2, white_positions, black_positions, squares, board)) {
            return true;
        }
    }
    return false;
}
