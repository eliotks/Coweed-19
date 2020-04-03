import Piece from './Piece.js';

export default class King extends Piece {
    constructor(player) {
        super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"), 100);
    }

    possible_moves(source, squares, board) {
        let directions = [];
        let castle_moves = [];
        if (this.can_castle(squares, board)[0]) {
            castle_moves.push([source, source + 2])
        }
        if (this.can_castle(squares, board)[1]) {
            castle_moves.push([source, source - 2])
        }
        const up = Math.floor(source/8);
        const left = source % 8;
        if (left < 7) {
            if (up < 7) {
                directions.push(9);
            }
            if (up > 0) {
                directions.push(-7)
            }
            directions.push(1)
        }
        if (left > 0) {
            if (up < 7) {
                directions.push(7);
            }
            if (up > 0) {
                directions.push(-9)
            }
            directions.push(-1)
        }
        if (up < 7) {
            directions.push(8);
        }
        if (up > 0) {
            directions.push(-8)
        }
        return castle_moves.concat(this.possible_one_step_moves(source, squares, directions));
    }

    can_castle(squares, board) {
        let king_side_castle = false;
        let queen_side_castle = false;
        if (this.player === 1) {
            if (board[7]) {
                if (squares[61] == null && squares[62] == null && squares[63] != null) {
                    if (squares[63].score === 5 && squares[63].player === 1) {
                        king_side_castle =  true;
                    }
                }
            }
            if (board[6]) {
                if (squares[59] == null && squares[58] == null && squares[57] == null && squares[56] != null) {
                    if (squares[56].score === 5 && squares[56].player === 1) {
                        queen_side_castle =  true;
                    }
                }
            }
        }
        else {
            if (board[5]) {
                if (squares[5] == null && squares[6] == null && squares[7] != null) {
                    if (squares[7].score === 5 && squares[7].player === 2) {
                        king_side_castle = true;
                    }
                }
            }
            if (board[4]) {
                if (squares[3] == null && squares[2] == null && squares[1] == null && squares[0] != null) {
                    if (squares[0].score === 5 && squares[0].player === 2) {
                        queen_side_castle =  true;
                    }
                }
            }
        }
        return [king_side_castle, queen_side_castle];
    }
}