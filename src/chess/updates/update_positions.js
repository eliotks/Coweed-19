
export default function update_positions(white_positions, black_positions, squares, board, move) {

    white_positions = white_positions.slice();
    black_positions = black_positions.slice();

    if (squares[move[0]].score === 1 && squares[move[1]] == null && (Math.abs(move[1]-move[0]) % 2) === 1) {
        if (move[1]-move[0] === -7 || move[1]-move[0] === 9) {
            if (squares[move[0]].player === 1) {
                const index = black_positions.indexOf(move[0]+1);
                black_positions.splice(index, 1);
            }
            else {
                const index = white_positions.indexOf(move[0]+1);
                white_positions.splice(index, 1);
            }
        }
        else {
            if (squares[move[0]].player === 1) {
                const index = black_positions.indexOf(move[0]-1);
                black_positions.splice(index, 1);
            }
            else {
                const index = white_positions.indexOf(move[0]-1);
                white_positions.splice(index, 1);
            }
        }
    }

    if (squares[move[0]].player === 1) {
        const index = white_positions.indexOf(move[0]);
        white_positions.splice(index, 1);
        white_positions.unshift(move[1]);
        if (squares[move[1]] != null) {
            if (squares[move[1]].player === 2) {
                const index = black_positions.indexOf(move[1]);
                black_positions.splice(index, 1);
            }
        }
    }
    else {
        const index = black_positions.indexOf(move[0]);
        black_positions.splice(index, 1);
        black_positions.unshift(move[1]);
        if (squares[move[1]] != null) {
            if (squares[move[1]].player === 1) {
                const index = white_positions.indexOf(move[1]);
                white_positions.splice(index, 1);
            }
        }
    }

    if (board[10]) {
        if (move[1]-move[0] === 2) {
            if (squares[move[0]].player === 1) {
                if (board[16] === 1) { // white bottom right
                    white_positions.splice(63, 1);
                    white_positions.unshift(61);
                }
                else { // white top right
                    white_positions.splice(7, 1);
                    white_positions.unshift(4);
                }
            }
            else {
                if (board[16] === 1) { // black top right
                    black_positions.splice(7, 1);
                    black_positions.unshift(5);
                }
                else { // black bottom right
                    black_positions.splice(63, 1);
                    black_positions.unshift(60);
                }
            }
        }
        else {
            if (squares[move[0]].player === 1) {
                if (board[16] === 1) { // white bottom left
                    white_positions.splice(56, 1);
                    white_positions.unshift(59);
                }
                else { // white top left
                    white_positions.splice(0, 1);
                    white_positions.unshift(2);
                }
            }
            else {
                if (board[16] === 1) { // black top left
                    black_positions.splice(0, 1);
                    black_positions.unshift(3);
                }
                else { // black bottom left
                    black_positions.splice(56, 1);
                    black_positions.unshift(58);
                }
            }
        }

        /*
        if (move[1]-move[0] === 2) {
            if (squares[move[0]].player === 1) {
                const index = white_positions.indexOf(move[0]+3);
                white_positions.splice(index, 1);
                white_positions.unshift(move[0]+1);
            }
            else {
                const index = black_positions.indexOf(move[0]+3);
                black_positions.splice(index, 1);
                black_positions.unshift(move[0]+1);
            }
        }
        else {
            if (squares[move[0]].player === 1) {
                const index = white_positions.indexOf(move[0]-4);
                white_positions.splice(index, 1);
                white_positions.unshift(move[0]-1);
            }
            else {
                const index = black_positions.indexOf(move[0]-4);
                black_positions.splice(index, 1);
                black_positions.unshift(move[0]-1);
            }
        }
         */
    }

    return [white_positions, black_positions];
}