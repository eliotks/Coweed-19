import Piece from "./Piece";

export default class Bishop extends Piece {
    constructor(player) {
        super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"), 3);
        this.directions = [-9, -7, 7, 9];
    }

    possible_moves(source, squares) {
        const up = Math.floor(source/8);
        const left = source % 8;
        const steps = [Math.min(left, up), Math.min(7-left, up), Math.min(left, 7-up), Math.min(7-left, 7-up)];
        return this.possible_line_moves(source, squares, this.directions, steps)
    }
}