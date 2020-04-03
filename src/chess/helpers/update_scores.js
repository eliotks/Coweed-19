
export default function update_scores(squares, board, move) {

    board = board.slice();

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

    return board;
}
