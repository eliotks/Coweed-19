import all_possible_moves from "./all_possible_moves";
import opposite_player from "./opposite_player";

export default function king_in_check(player, opposite_positions, squares, board) {
    let position = board[2];
    if (player === 2) {
        position = board[3];
    }
    const enemy_moves = all_possible_moves(opposite_player(player), opposite_positions, squares, board);
    if (enemy_moves.length === 0) {
        if (board[1] === "stalemate") {
            return false;
        }
        else if (board[1] === "white") {
            return player === 2;
        }
        else if (board[1] === "black") {
            return player === 1;
        }
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