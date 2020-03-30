import all_legal_moves from "../helpers/all_legal_moves";
import king_in_check from "../helpers/king_in_check";

export default class Board {

    constructor(board_attributes) {
        this.squares = board_attributes[0];
        this.score = board_attributes[1];
        this.winner = board_attributes[2]; // can be "white", "black" or "stalemate"
        this.white_king_position = board_attributes[3];
        this.black_king_position = board_attributes[4];
        this.can_castle_list = board_attributes[5]; // [black_queen_side, black_king_side, white_queen_side, white_king_side]
        this.rook_positions = [0, 7, 56, 63]; // same pattern as above
        this.white_has_castled = board_attributes[7];
        this.black_has_castled = board_attributes[8];
    }

    update_board(move) {
        this.update_score(move);
        this.update_kings_and_castles(move);
        this.update_squares(move);
        this.update_winner();
    }

    update_score(move) {
        if (this.squares[move[1]] != null) {
            if (this.squares[move[1]].player === 1) {
                this.score -= this.squares[move[1]].score;
            }
            else {
                this.score += this.squares[move[1]].score;
            }
        }
    }

    update_squares(move) {
        const squares = this.squares.slice();
        squares[move[1]] = squares[move[0]];
        squares[move[0]] = null;
    }

    stalemate() {
        if (all_legal_moves(1, this.squares).length === 0 && all_legal_moves(2, this.squares).length === 0) {
            return !(king_in_check(1, this.squares) || king_in_check(2, this.squares));
        }
    }

    white_has_won() {return all_legal_moves(2, this.squares).length === 0 && king_in_check(2, this.squares);}

    black_has_won() {return all_legal_moves(1, this.squares).length === 0 && king_in_check(1, this.squares);}

    update_winner() {
        if (this.stalemate()) {
            this.winner = "stalemate";
        }
        else if (this.white_has_won()){
            this.winner = "white";
        }
        else if (this.black_has_won()) {
            this.winner = "black"
        }
    }

    update_kings_and_castles(move) {
        if (this.squares[move[0]].score === 100) {
            if (this.squares[move[0]].player === 1) {
                this.white_king_position = move[1];
                this.can_castle_list[2] = false;
                this.can_castle_list[3] = false;
                if (Math.abs(move[1]-move[0]) === 2) {
                    this.white_has_castled = true;
                }
            }
            else {
                this.black_king_position = move[1];
                this.can_castle_list[0] = false;
                this.can_castle_list[1] = false;
                if (Math.abs(move[1]-move[0]) === 2) {
                    this.black_has_castled = true;
                }
            }
        }
        else if (this.squares[move[0]].score === 5) {
            for (let i = 0; i < 4; i++) {
                if (this.can_castle_list[i]) {
                    if (move[0] === this.rook_positions[i] || move[1] === this.rook_positions[i]) {
                        this.can_castle_list[i] = false;
                    }
                }
            }
        }
    }

}