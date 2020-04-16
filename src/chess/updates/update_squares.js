import Queen from "../pieces/Queen";

export default function update_squares(squares, board, move) {

    squares = squares.slice();

    // en passant
    if (squares[move[0]].score === 1 && squares[move[1]] == null && (Math.abs(move[1]-move[0]) % 2) === 1) {
        if (move[1]-move[0] === -7 || move[1]-move[0] === 9) {
            squares[move[0]+1] = null;
        }
        else if (move[1]-move[0] === 7 || move[1]-move[0] === -9) {
            squares[move[0]-1] = null;
        }
    }

    // castling
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

    // queening
    if (squares[move[0]].score === 1 && (Math.floor(move[1]/8) === 0 || Math.floor(move[1]/8) === 7)) {
        if (squares[move[0]].player === 1) {
            squares[move[1]] = new Queen(1);
            squares[move[0]] = null;
        }
        else {
            squares[move[1]] = new Queen(2);
            squares[move[0]] = null;
        }
    }

    // moving
    else {
        squares[move[1]] = squares[move[0]];
        squares[move[0]] = null;
    }

    return squares;
}
