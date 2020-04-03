import all_legal_moves from "./all_legal_moves";
import king_in_check from "./king_in_check";

export default function black_has_won(squares, board) {
    return all_legal_moves(1, squares, board).length === 0 && king_in_check(1, squares, board);
}