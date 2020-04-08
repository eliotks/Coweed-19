import all_legal_moves from "../helpers/all_legal_moves";
import king_in_check from "../helpers/king_in_check";

export default function white_has_won(white_positions, black_positions, squares, board) {
    return all_legal_moves(2, white_positions, black_positions, squares, board).length === 0 && king_in_check(2, white_positions, black_positions, squares, board);
}