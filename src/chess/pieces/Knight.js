import Piece from './Piece.js';

export default class Knight extends Piece {
    constructor(player) {
        super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"));
    }

    possible_moves(source, squares) {
        const directions = [];
        const up = Math.floor(source/8);
        const left = source % 8;

        if (up > 1 && left > 0) {
            directions.push(-17);
        }
        if (up > 0 && left > 1) {
            directions.push(-10);
        }
        if (up < 6 && left > 0) {
            directions.push(15);
        }
        if (up < 7 && left > 1) {
            directions.push(6);
        }
        if (up > 1 && left < 7) {
            directions.push(-15);
        }
        if (up > 0 && left < 6) {
            directions.push(-6);
        }
        if (up < 6 && left < 7) {
            directions.push(17);
        }
        if (up < 7 && left < 6) {
            directions.push(10);
        }

        return this.possible_one_step_moves(source, squares, directions);
    }
}