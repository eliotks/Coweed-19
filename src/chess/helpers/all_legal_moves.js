import all_possible_moves from "./all_possible_moves";
import is_legal_move from "./is_legal_move";

export default function all_legal_moves(player, white_positions, black_positions, squares, board) {

    const all_legal_moves = [];

    const possible_moves = all_possible_moves(player, white_positions, black_positions, squares, board);

    for (let i = 0; i < possible_moves.length; i++) {
        if (is_legal_move(player, white_positions, black_positions, squares, board, possible_moves[i])) {
            all_legal_moves.push(possible_moves[i]);
        }
    }

    return all_legal_moves;
}