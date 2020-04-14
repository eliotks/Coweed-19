import update_board from "./update_board";
import update_squares from "./update_squares";
import update_positions from "./update_positions";
import opposite_player from "../helpers/opposite_player";

export default function update_all(white_positions, black_positions, squares, board, move) {

    const updated_board = update_board(squares, board, move);

    const positions = update_positions(white_positions, black_positions, squares, updated_board, move);

    const updated_squares = update_squares(squares, updated_board, move);

    updated_board[10] = false;

    updated_board[1] = opposite_player(updated_board[1]);

    return [positions[0], positions[1], updated_squares, updated_board];
}