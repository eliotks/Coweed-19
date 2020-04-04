import all_legal_moves from "./all_legal_moves";
import king_in_check from "./king_in_check";

export default function stalemate(white_positions, black_positions, squares, board) {
    if (all_legal_moves(1, white_positions, black_positions, squares, board).length === 0 && all_legal_moves(2, black_positions, white_positions, squares, board).length === 0) {
        return !(king_in_check(1, black_positions, squares, board) || king_in_check(2, white_positions, squares, board));
    }
}
