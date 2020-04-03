import all_legal_moves from "./all_legal_moves";
import king_in_check from "./king_in_check";

export default function stalemate(squares, board) {
    if (all_legal_moves(1, squares, board).length === 0 && all_legal_moves(2, squares, board).length === 0) {
        return !(king_in_check(1, squares, board) || king_in_check(2, squares, board));
    }
}
