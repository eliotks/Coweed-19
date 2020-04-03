import king_in_check from "./king_in_check";
import update_kings_and_castles from "./update_kings_and_castles";
import update_squares from "./update_squares";

export default function is_legal_move(squares, board, move) {
    squares = squares.slice();
    board = board.slice();

    if (squares[move[0]] != null) {
        const player = squares[move[0]].player;

        const updated_board = update_kings_and_castles(squares, board, move);

        const updated_squares = update_squares(squares, updated_board, move);

        return !king_in_check(player, updated_squares, updated_board);
    }
    return false;
}