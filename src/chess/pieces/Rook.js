import Piece from './Piece.js';

export default class Rook extends Piece {
    constructor(player) {
        super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"), 5);
        this.directions = [-1, -8, 1, 8];
        this.has_not_moved = true;
    }

    possible_moves(source, squares) {
        const up = Math.floor(source/8);
        const left = source % 8;
        const steps = [left, up, 7-left, 7-up];
        return this.possible_line_moves(source, squares, this.directions, steps)
    }
}