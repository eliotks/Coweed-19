import update_scores from "./update_scores";
import update_kings_and_castles from "./update_kings_and_castles";
import update_squares from "./update_squares";
import update_winner from "./update_winner";
import update_positions from "./update_positions";

export default function update_all(white_positions, black_positions, squares, board, move) {

    const updated_score_board = update_scores(squares, board, move);

    const updated_kings_and_castles_board = update_kings_and_castles(squares, updated_score_board, move);

    const positions = update_positions(white_positions, black_positions, squares, board, move);

    const updated_squares = update_squares(squares, updated_kings_and_castles_board, move);

    const updated_board = update_winner(positions[0], positions[1], updated_squares, updated_kings_and_castles_board);

    updated_board[10] = false;

    return [positions[0], positions[1], updated_squares, updated_board];
}