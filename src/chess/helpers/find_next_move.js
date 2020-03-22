import all_legal_moves from "./all_legal_moves";
import evaluate_board from "./evaluate_board";

export default function find_next_move(squares, player) {

    // alpha starter på -1000
    // beta starter på 1000

    let white_king_position = 0;
    let black_king_position = 0;
    const rook_positions = [];
    for (let i = 0; i < 64; i++) {
        if (squares[i] != null) {
            if (squares[i].score === 100) {
                if (squares[i].player === 1) {
                    white_king_position = i;
                }
                else {
                    black_king_position = i;
                }
            }
            if (squares[i].score === 5) {
                if (squares[i].player === 1) {
                    rook_positions.push(i);
                }
                else {
                    rook_positions.push(i);
                }
            }
        }
    }
    const white_has_castled_copy = squares[white_king_position].has_castled;
    const black_has_castled_copy = squares[black_king_position].has_castled;
    const white_king_has_not_moved_copy = squares[white_king_position].has_not_moved;
    const black_king_has_not_moved_copy = squares[black_king_position].has_not_moved;
    const rook_has_not_moved_copy = [];
    for (let i = 0; i < rook_positions.length; i++) {
        rook_has_not_moved_copy.push(squares[rook_positions[i]].has_not_moved)
    }

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

                if (score_squares[legal_moves[i][1]].score === 5 || score_squares[legal_moves[i][1]].score === 100) {
                    score_squares[legal_moves[i][1]].has_not_moved = false;
                    if (score_squares[legal_moves[i][1]].score === 100 && legal_moves[i][1] - legal_moves[i][0] === 2) {
                        score_squares[legal_moves[i][1] - 1] = score_squares[legal_moves[i][1] + 1];
                        score_squares[legal_moves[i][1] + 1] = null;
                        score_squares[legal_moves[i][1]].has_castled = true;
                    }
                    else if (score_squares[legal_moves[i][1]].score === 100 && legal_moves[i][0] - legal_moves[i][1] === 2) {
                        score_squares[legal_moves[i][1] + 1] = score_squares[legal_moves[i][1] - 2];
                        score_squares[legal_moves[i][1] - 2] = null;
                        score_squares[legal_moves[i][1]].has_castled = true;
                    }
                }

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

                if (score_squares[legal_moves[i][1]].score === 5 || score_squares[legal_moves[i][1]].score === 100) {
                    score_squares[legal_moves[i][1]].has_not_moved = false;
                    if (score_squares[legal_moves[i][1]].score === 100 && legal_moves[i][1] - legal_moves[i][0] === 2) {
                        score_squares[legal_moves[i][1] - 1] = score_squares[legal_moves[i][1] + 1];
                        score_squares[legal_moves[i][1] + 1] = null;
                        score_squares[legal_moves[i][1]].has_castled = true;
                    }
                    else if (score_squares[legal_moves[i][1]].score === 100 && legal_moves[i][0] - legal_moves[i][1] === 2) {
                        score_squares[legal_moves[i][1] + 1] = score_squares[legal_moves[i][1] - 2];
                        score_squares[legal_moves[i][1] - 2] = null;
                        score_squares[legal_moves[i][1]].has_castled = true;
                    }
                }

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

    squares[white_king_position].has_castled = white_has_castled_copy;
    squares[black_king_position].has_castled = black_has_castled_copy;
    squares[white_king_position].has_not_moved = white_king_has_not_moved_copy;
    squares[black_king_position].has_not_moved = black_king_has_not_moved_copy;
    for (let i = 0; i < rook_positions.length; i++) {
        squares[rook_positions[i]].has_not_moved = rook_has_not_moved_copy[i];
    }

    return next_move;
}