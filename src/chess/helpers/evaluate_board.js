import all_legal_moves from "./all_legal_moves";

export default function evaluate_board(squares, board) {

    if (board[1] === "white") {
        return 1000;
    }
    else if (board[1] === "black") {
        return -1000;
    }
    else if (board[1] === "stalemate") {
        return 0;
    }

    let score = board[0];

    score += (63/(board[11]+board[12]) - board[13]/board[11] - board[14]/board[12])*0.02;

    const white_moves = all_legal_moves(1, squares, board);
    score += white_moves.length*0.03;

    const black_moves = all_legal_moves(2, squares, board);
    score -= black_moves.length*0.03;

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
        score += 1;
    }

    if (board[9]) {
        score -= 1;
    }

    if (board[4] || board[5]) {
        score -= 0.3;
    }

    if (board[6] || board[7]) {
        score += 0.3;
    }

    return score;
}
