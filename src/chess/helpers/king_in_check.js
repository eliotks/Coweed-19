import all_possible_moves from "../moves/all_possible_moves";
import opposite_player from "./opposite_player";

export default function king_in_check(player, white_positions, black_positions, squares, board) {

    let position = board[2];
    if (player === 2) {
        position = board[3];
    }
    const enemy_moves = all_possible_moves(opposite_player(player), white_positions, black_positions, squares, board);

    for (let i = 0; i < enemy_moves.length; i++) {
        if (enemy_moves[i][1] === position) {
            return true;
        }
    }

    return false;
}