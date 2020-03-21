import all_legal_moves from "./all_legal_moves";
import evaluate_board from "./evaluate_board";

export default function find_next_move(squares, player) {

    // alpha starter på -1000
    // beta starter på 1000

    const global_depth = 3;

    let next_move = [];

    function min_max(squares, depth, player, alpha, beta) {

        if (depth === 0) {
            return evaluate_board(squares);
        }

        if (player === 1) {

            let max_score = -1000;

            const legal_moves = all_legal_moves(1, squares);

            for (let i = 0; i < legal_moves.length; i++) {
                let score_squares = squares.slice();
                score_squares[legal_moves[i][1]] = score_squares[legal_moves[i][0]];
                score_squares[legal_moves[i][0]] = null;

                let score = min_max(score_squares, depth-1, 2, alpha, beta);
                max_score = Math.max(max_score, score);

                if (score > alpha) {
                    alpha = score;
                    if (depth === global_depth) {
                        next_move = legal_moves.slice(i, i+1);
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

            const legal_moves = all_legal_moves(2, squares);

            for (let i = 0; i < legal_moves.length; i++) {
                let score_squares = squares.slice();
                score_squares[legal_moves[i][1]] = score_squares[legal_moves[i][0]];
                score_squares[legal_moves[i][0]] = null;

                let score = min_max(score_squares, depth-1, 1, alpha, beta);
                min_score = Math.min(min_score, score);

                if (score < beta) {
                    beta = score;
                    if (depth === global_depth) {
                        next_move = legal_moves[i].slice();
                    }
                }

                if (beta <= alpha) {
                    break
                }
            }
            return min_score;
        }
    }

    min_max(squares, global_depth, player, -1000, 1000);

    return next_move;
}