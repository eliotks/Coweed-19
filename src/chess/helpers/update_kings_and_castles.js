
export default function update_kings_and_castles(squares, board, move) {

    board = board.slice();

    const rook_positions = [0, 7, 56, 63];

    if (squares[move[0]].score === 100) {
        if (squares[move[0]].player === 1) {
            board[2] = move[1];
            board[6] = false;
            board[7] = false;
            if (Math.abs(move[1]-move[0]) === 2) {
                board[8] = true;
                board[10] = true;
            }
        }
        else {
            board[3] = move[1];
            board[4] = false;
            board[5] = false;
            if (Math.abs(move[1]-move[0]) === 2) {
                board[9] = true;
                board[10] = true;
            }
        }
    }

    else if (squares[move[0]].score === 5) {
        for (let i = 0; i < 4; i++) {
            if (board[i+4]) {
                if (move[0] === rook_positions[i] || move[1] === rook_positions[i]) {
                    board[i+4] = false;
                }
            }
        }
    }

    return board;
}

