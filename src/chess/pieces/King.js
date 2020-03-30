import Piece from './Piece.js';

export default class King extends Piece {
    constructor(player) {
        super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"), 100);
        this.has_not_moved = true;
        this.has_castled = false;
    }

    possible_moves(source, squares) {
        let directions = [];
        let castle_moves = [];
        if (this.can_castle(squares, "king")) {
            castle_moves.push([source, source + 2])
        }
        if (this.can_castle(squares, "queen")) {
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

    can_castle(squares, side) {
        if (this.has_not_moved) {
            const position = this.player === 1 ? 60 : 4;
            if (side === "king") {
                if (squares[position+1] == null && squares[position+2] == null && squares[position+3] != null) {
                    if (squares[position+3].score === 5 && squares[position+3].player === this.player) {
                        if (squares[position+3].has_not_moved) {
                            return true;
                        }
                    }
                }
            }
            else {
                if (squares[position-1] == null && squares[position-2] == null && squares[position-3] == null && squares[position-4] != null) {
                    if (squares[position-4].score === 5 && squares[position-4].player === this.player) {
                        if (squares[position-4].has_not_moved) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}