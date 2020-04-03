import update_scores from "./update_scores";
import update_kings_and_castles from "./update_kings_and_castles";
import update_squares from "./update_squares";
import update_winner from "./update_winner";

export default function update_squares_and_board(squares, board, move) {

    squares = squares.slice();
    board = board.slice();

    const updated_score_board = update_scores(squares, board, move);

    const updated_kings_and_castles_board = update_kings_and_castles(squares, updated_score_board, move);

    const updated_squares = update_squares(squares, updated_kings_and_castles_board, move);

    const updated_board = update_winner(updated_squares, updated_kings_and_castles_board);

    updated_board[10] = false;

    return [updated_squares, updated_board];
}