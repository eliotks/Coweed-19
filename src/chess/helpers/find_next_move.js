import all_legal_moves from "./all_legal_moves";
import evaluate_board from "./evaluate_board";
import update_efficiently from "./update_efficiently";

export default function find_next_move(player, white_positions, black_position, squares, board) {

    // alpha starter på -1000
    // beta starter på 1000

    squares = squares.slice();
    board = board.slice();
    white_positions = white_positions.slice();
    black_position = black_position.slice();

    const global_depth = 4;

    let next_move = [];

    function min_max(white_positions, black_positions, squares, board, depth, player, alpha, beta) {

        if (depth === 0) {
            return evaluate_board(white_positions, black_positions, squares, board);
        }

        if (player === 1) {

            let max_score = -1000;

            const legal_moves = all_legal_moves(1, white_positions, black_positions, squares, board);

            for (let i = 0; i < legal_moves.length; i++) {
                const new_board = board.slice();
                const new_squares = squares.slice();
                const new_white_positions = white_positions.slice();
                const new_black_positions = black_positions.slice();

                const updated = update_efficiently(new_white_positions, new_black_positions, new_squares, new_board, legal_moves[i]);

                let score = min_max(updated[0], updated[1], updated[2], updated[3], depth-1, 2, alpha, beta);
                max_score = Math.max(max_score, score);

                if (score > alpha) {
                    alpha = score;
                    if (depth === global_depth) {
                        next_move = legal_moves[i];
                    }
                }

                if (beta <= alpha) {
                    break
                }
            }
            return max_score;
        }

        else {

            let min_score = 1000;

            const legal_moves = all_legal_moves(2, white_positions, black_positions, squares, board);

            for (let i = 0; i < legal_moves.length; i++) {
                const new_board = board.slice();
                const new_squares = squares.slice();
                const new_white_positions = white_positions.slice();
                const new_black_positions = black_positions.slice();

                const updated = update_efficiently(new_white_positions, new_black_positions, new_squares, new_board, legal_moves[i]);

                let score = min_max(updated[0], updated[1], updated[2], updated[3], depth-1, 1, alpha, beta);
                min_score = Math.min(min_score, score);

                if (score < beta) {
                    beta = score;
                    if (depth === global_depth) {
                        next_move = legal_moves[i];
                    }
                }

                if (beta <= alpha) {
                    break
                }
            }
            return min_score;
        }
    }

    min_max(white_positions, black_position, squares, board, global_depth, player, -10000, 10000);

    return next_move;
}