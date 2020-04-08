import king_in_check from "./king_in_check";
import update_kings_and_castles from "./updates/update_kings_and_castles";
import update_squares from "./updates/update_squares";
import update_positions from "./updates/update_positions";

export default function is_legal_move(player, white_positions, black_positions, squares, board, move) {

    if (squares[move[0]] != null) {

        const updated_board = update_kings_and_castles(squares, board, move);

        const positions = update_positions(white_positions, black_positions, squares, board, move);

        const updated_squares = update_squares(squares, updated_board, move);

        return !king_in_check(player, positions[0], positions[1], updated_squares, updated_board);
    }
    return false;
}