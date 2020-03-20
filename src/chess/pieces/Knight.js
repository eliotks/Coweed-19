import Piece from './Piece.js';

export default class Knight extends Piece {
    constructor(player) {
        super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"));
    }

    possible_moves(source, squares) {
        const directions = [-17, -15, -10, -6, 6, 10, 15, 17];
        const up = Math.floor(source/8);
        const left = source % 8;

        // funker ikke. Må gjøre noe lurt her med å sjekke up/left

        return this.possible_one_step_moves(source, squares, directions);
    }
}