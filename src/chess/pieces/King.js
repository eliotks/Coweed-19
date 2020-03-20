import Piece from './Piece.js';

export default class King extends Piece {
    constructor(player) {
        super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"));
        this.directions = [-9, -8, -7, -1, 1, 7, 8, 9];
        this.type_of_piece = "king";
    }

    possible_moves(source, squares) {
        return this.possible_one_step_moves(source, squares, this.directions);
    }
}