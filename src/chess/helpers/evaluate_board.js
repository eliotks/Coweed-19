import all_legal_moves from "../moves/all_legal_moves";
import king_in_check from "./king_in_check";
import black_has_won from "../game_over/black_has_won";
import white_has_won from "../game_over/white_has_won";
import stalemate from "../game_over/stalemate";

export default function evaluate_board(white_positions, black_positions, squares, board) {

    if (king_in_check(1, white_positions, black_positions, squares, board)) {
        if (black_has_won(white_positions, black_positions, squares, board)) {
            return -1000;
        }
    }

    if (king_in_check(2, white_positions, black_positions, squares, board)) {
        if (white_has_won(white_positions, black_positions, squares, board)) {
            return -1000;
        }
    }

    // if (stalemate(white_positions, black_positions, squares, board)) {
    //     return 0;
    // }

    let score = board[0];

    score += (63 - board[13]/board[11] - board[14]/board[12])*0.01;

    // const white_moves = all_legal_moves(1, white_positions, black_positions, squares, board);
    // score += white_moves.length*0.02;

    // const black_moves = all_legal_moves(2, white_positions, black_positions, squares, board);
    // score -= black_moves.length*0.03;

    // const center = [27, 28, 35, 36];
    // for (let i = 0; i < 4; i++) {
    //     for (let w = 0; w < white_moves.length; w++) {
    //         if (white_moves[w][1] === center[i]) {
    //             score += 0.12;
    //         }
    //     }
    //     for (let b = 0; b < black_moves.length; b++) {
    //         if (black_moves[b][1] === center[i]) {
    //             score -= 0.12;
    //         }
    //     }
    // }

    if (board[8]) {
        score += 0.7;
    }

    if (board[9]) {
        score -= 0.7;
    }

    if (board[4] || board[5]) {
        score -= 0.1;
    }

    if (board[6] || board[7]) {
        score += 0.1;
    }

    return score;
}
