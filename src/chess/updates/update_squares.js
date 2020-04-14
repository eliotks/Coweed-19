
export default function update_squares(squares, board, move) {

    squares = squares.slice();

    if (squares[move[0]].score === 1 && squares[move[1]] == null && (Math.abs(move[1]-move[0]) % 2) === 1) {
        if (move[1]-move[0] === -7 || move[1]-move[0] === 9) {
            squares[move[0]+1] = null;
        }
        else if (move[1]-move[0] === 7 || move[1]-move[0] === -9) {
            squares[move[0]-1] = null;
        }
    }

    squares[move[1]] = squares[move[0]];
    squares[move[0]] = null;

    if (board[10]) {
        if (move[1]-move[0] === 2) {
            squares[move[0]+1] = squares[move[0]+3];
            squares[move[0]+3] = null;
        }
        else {
            squares[move[0]-1] = squares[move[0]-4];
            squares[move[0]-4] = null;
        }
    }

    return squares;
}
