
import update_kings_and_castles from "./update_kings_and_castles";
import update_squares from "./update_squares";
import update_scores from "./update_scores";
import update_positions from "./update_positions";

export default function update_efficiently(white_positions, black_positions, squares, board, move) {

    const updated_score_board = update_scores(squares, board, move);

    const updated_board = update_kings_and_castles(squares, updated_score_board, move);

    const positions = update_positions(white_positions, black_positions, squares, board, move);

    const updated_squares = update_squares(squares, updated_board, move);

    updated_board[10] = false;

    return [positions[0], positions[1], updated_squares, updated_board];
}