import all_possible_moves from "./all_possible_moves";
import opposite_player from "./opposite_player";

export default function king_in_check(player, board) {
    let position = board.white_king_position;
    if (player === 2) {
        position = board.black_king_position;
    }
    const enemy_moves = all_possible_moves(opposite_player(player), board);
    if (enemy_moves.length === 0) {
        // patt eller matt
    }
    else {
        for (let i = 0; i < enemy_moves.length; i++) {
            if (enemy_moves[i][1] === position) {
                return true;
            }
        }
    }
    return false;
}