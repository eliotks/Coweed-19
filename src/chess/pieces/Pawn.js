import Piece from "./Piece";

export default class Pawn extends Piece {
    constructor(player) {
        super(player, (player === 1?  "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"), 1);
        this.initialPositions = {
            1: [48, 49, 50, 51, 52, 53, 54, 55],
            2: [8, 9, 10, 11, 12, 13, 14, 15]
        };
    }

    possible_moves(source, squares, board) {
        const moves = [];
        const direction = this.player === 1 ? -1 : 1;

        // do not need this - just need to check if the pawn moves to the last rank while updating
        // if (source in this.initialPositions[this.player-direction]) {
               // time_to_queen
        // }

        if (squares[source + direction*8] == null) {
            moves.push([source, source + direction*8]);
            if (this.initialPositions[this.player].includes(source) && squares[source + direction*16] == null) {
                moves.push([source, source + direction*16])
            }
        }
        if (source % 8 !== 7) {
            if (this.player === 1) {
                if (squares[source - 7] != null) {
                    if (squares[source - 7].player === 2) {
                        moves.push([source, source - 7])
                    }
                }
                else {
                    if (board[15] === source + 1) {
                        moves.push([source, source - 7])
                    }
                }
            }
            else {
                if (squares[source + 9] != null) {
                    if (squares[source + 9].player === 1) {
                        moves.push([source, source + 9])
                    }
                }
                else {
                    if (board[15] === source + 1) {
                        moves.push([source, source + 9])
                    }
                }
            }
        }
        if (source % 8 !== 0) {
            if (this.player === 1) {
                if (squares[source - 9] != null) {
                    if (squares[source - 9].player === 2) {
                        moves.push([source, source - 9])
                    }
                }
                else {
                    if (board[15] === source - 1) {
                        moves.push([source, source - 9])
                    }
                }
            }
            else {
                if (squares[source + 7] != null) {
                    if (squares[source + 7].player === 1) {
                        moves.push([source, source + 7])
                    }
                }
                else {
                    if (board[15] === source - 1) {
                        moves.push([source, source + 7])
                    }
                }
            }
        }

        return moves;
    }
}