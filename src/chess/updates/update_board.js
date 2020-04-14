
export default function update_board(squares, board, move) {

    board = board.slice();

    // updates scores and pieces
    if (squares[move[0]].score === 1 && squares[move[1]] == null && (Math.abs(move[1]-move[0]) % 2) === 1) {
        if (move[1]-move[0] === -7) {
            board[0] = board[0] + 1;
            board[12] = board[12] - 1;
            board[14] = board[14] - (move[0]+1);
        }
        else if (move[1]-move[0] === -9) {
            board[0] = board[0] + 1;
            board[12] = board[12] - 1;
            board[14] = board[14] - (move[0]-1);
        }
        else if (move[1]-move[0] === 7) {
            board[0] = board[0] - 1;
            board[11] = board[11] - 1;
            board[13] = board[13] - (move[0]-1);
        }
        else {
            board[0] = board[0] - 1;
            board[11] = board[11] - 1;
            board[13] = board[13] - (move[0]+1);
        }
    }
    if (squares[move[1]] != null) {
        if (squares[move[1]].player === 1) {
            board[0] = board[0] - squares[move[1]].score;
            board[11] = board[11] - 1;
            board[13] = board[13] - move[1];
        }
        else {
            board[0] = board[0] + squares[move[1]].score;
            board[12] = board[12] - 1;
            board[14] = board[14] - move[1];
        }
    }
    if (squares[move[0]].player === 1) {
        board[13] = board[13] + move[1] - move[0];
    }
    else {
        board[14] = board[14] + move[1] - move[0];
    }

    // updates kings and castling
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

    // updates en passant
    if (squares[move[0]].score === 1 && Math.abs(move[0]-move[1]) === 16) {
        board[15] = move[1];
    }
    else {
        board[15] = null;
    }

    return board;
}

