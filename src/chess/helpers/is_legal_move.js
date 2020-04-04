import king_in_check from "./king_in_check";
import update_kings_and_castles from "./update_kings_and_castles";
import update_squares from "./update_squares";
import update_positions from "./update_positions";

export default function is_legal_move(player, player_positions, opposite_positions, squares, board, move) {

    if (squares[move[0]] != null) {

        const updated_board = update_kings_and_castles(squares, board, move);

        let white_positions = [];
        let black_positions = [];

        if (player === 1) {
            white_positions = player_positions;
            black_positions = opposite_positions;
        }
        else {
            white_positions = opposite_positions;
            black_positions = player_positions;
        }

        const positions = update_positions(white_positions, black_positions, squares, board, move);

        let new_opposite_positions = [];

        if (player === 1) {
            new_opposite_positions = positions[1];
        }
        else {
            new_opposite_positions = positions[0];
        }

        const updated_squares = update_squares(squares, updated_board, move);

        return !king_in_check(player, new_opposite_positions, updated_squares, updated_board);
    }
    return false;
}