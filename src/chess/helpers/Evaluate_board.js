import All_legal_moves from "./All_legal_moves";



export default function Evaluate_board(squares) {
    let score = 0;
    let white_position_sum = 0;
    let white_pieces = 0;
    let black_position_sum = 0;
    let black_pieces = 0;

    for (let i = 0; i < 64; i++) {
        if (squares[i] != null) {
            if (squares[i].player === 1) {
                score += squares[i].score;
                white_pieces += 1;
                white_position_sum += i;
            }
            else {
                score -= squares[i].score;
                black_pieces += 1;
                black_position_sum += i;
            }
        }
    }

    const average = 32;
    const white_position_score = white_position_sum/white_pieces;
    const black_position_score = black_position_sum/black_pieces;

    score += (average - white_position_score)*0.03;
    score += (average - black_position_score)*0.03;

    let black_moves = All_legal_moves(2, squares);
    let white_moves = All_legal_moves(1, squares);

    score += white_moves*0.05;
    score -= black_moves*0.05;

    const center_position = [27, 28, 35, 36];

    for (let i = 0; i < 4; i++) {
        for (let y = 0; y < white_moves.length; y++) {
            if (white_moves[y] === center_position[i]) {
                score += 0.1;
            }
        }

        for (let y = 0; y < black_moves; y++) {
            if (white_moves[y] === center_position[i]) {
                score -= 0.1;
            }
        }
    }

    return score;
}