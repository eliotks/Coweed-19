import Piece from './Piece.js';

export default class King extends Piece {
    constructor(player) {
        super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"), 100);
        this.directions = [-9, -8, -7, -1, 1, 7, 8, 9];
        this.has_not_moved = true;
        this.has_castled = false;
    }

    possible_moves(source, squares) {
        let castle_moves = [];

        if (this.can_castle(squares, "king")) {
            castle_moves.push([source, source + 2])
        }

        if (this.can_castle(squares, "queen")) {
            castle_moves.push([source, source - 2])
        }

        return castle_moves.concat(this.possible_one_step_moves(source, squares, this.directions));
    }

    can_castle(squares, side) {
        if (this.has_not_moved) {
            let position = 4;
            if (this.player === 1) {
                position = 60;
            }
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