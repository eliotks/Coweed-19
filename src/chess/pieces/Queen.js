import Piece from './Piece.js';

export default class Queen extends Piece {
    constructor(player) {
        super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"), 9);
        this.diagonal_directions = [-9, -7, 7, 9];
        this.straight_directions = [-1, -8, 1, 8];
    }

    possible_moves(source, squares) {
        const up = Math.floor(source/8);
        const left = source % 8;
        const diagonal_steps = [Math.min(left, up), Math.min(7-left, up), Math.min(left, 7-up), Math.min(7-left, 7-up)];
        const straight_steps = [left, up, 7-left, 7-up];
        const diagonal_moves = this.possible_line_moves(source, squares, this.diagonal_directions, diagonal_steps);
        const straight_moves = this.possible_line_moves(source, squares, this.straight_directions, straight_steps);
        return diagonal_moves.concat(straight_moves);
    }
}