import all_legal_moves from "./all_legal_moves";
import Board from "../components/Board";
import get_board_attributes from "./get_board_attributes";

export default function find_next_move(board, player) {

    // alpha starter på -1000
    // beta starter på 1000

    const global_depth = 2;

    let next_move = [];

    function min_max(board, depth, player, alpha, beta) {

        if (depth === 0) {
            return board.evaluate();
        }

        if (player === 1) {

            let max_score = -1000;

            const legal_moves = all_legal_moves(1, board);

            for (let i = 0; i < legal_moves.length; i++) {
                const score_board = new Board(get_board_attributes(board));
                score_board.update_board(legal_moves[i]);

                let score = min_max(score_board, depth-1, 2, alpha, beta);
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

            const legal_moves = all_legal_moves(2, board);

            for (let i = 0; i < legal_moves.length; i++) {
                let score_board = new Board(get_board_attributes(board));
                score_board.update_board(legal_moves[i]);

                let score = min_max(score_board, depth-1, 1, alpha, beta);
                min_score = Math.min(min_score, score);

                if (score < beta) {
                    beta = score;
                    if (depth === global_depth) {
                        next_move = legal_moves.slice(i, i+1);
                    }
                }

                if (beta <= alpha) {
                    break
                }
            }
            return min_score;
        }
    }

    min_max(board, global_depth, player, -10000, 10000);

    return next_move;
}