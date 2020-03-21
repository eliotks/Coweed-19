import all_possible_moves from "./all_possible_moves";
import opposite_player from "./opposite_player";
export default function king_in_check(player, squares) {
    let position = 0;
    for (let i = 0; i < 64; i++) {
        if (squares[i] != null) {
            if (squares[i].score === 100 && squares[i].player === player) {
                position = i;
                break;
            }
        }
    }
    const enemy_moves = all_possible_moves(opposite_player(player), squares);
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