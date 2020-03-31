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
        this.white_has_castled = board_attributes[6];
        this.black_has_castled = board_attributes[7];
        this.castling_now = false;
        this.white_pieces = board_attributes[8];
        this.black_pieces = board_attributes[9];
        this.white_position_sum = board_attributes[10];
        this.black_positions_sum = board_attributes[11];
    }

    get_squares() {
        return this.squares.slice();
    }

    update_board(move) {
        this.update_score_and_pieces_and_position_sum(move);
        this.update_kings_and_castles(move);
        this.update_squares(move);
        this.update_winner();
    }

    update_score_and_pieces_and_position_sum(move) {
        if (this.squares[move[1]] != null) {
            if (this.squares[move[1]].player === 1) {
                this.score -= this.squares[move[1]].score;
                this.white_pieces -= 1;
                this.white_position_sum -= move[1];
            }
            else {
                this.score += this.squares[move[1]].score;
                this.black_pieces -= 1;
                this.black_position_sum -= move[1];
            }
        }
        if (this.squares[move[0]].player === 1) {
            this.white_position_sum += move[1] - move[0];
        }
        else {
            this.black_position_sum += move[1] - move[0];
        }
    }

    update_squares(move) {
        const squares = this.squares.slice();
        squares[move[1]] = squares[move[0]];
        squares[move[0]] = null;
        if (this.castling_now) {
            if (move[1]-move[0] === 2) {
                squares[move[0]+1] = squares[move[0]+3];
                squares[move[0]+3] = null;
            }
            else {
                squares[move[0]-1] = squares[move[0]-4];
                squares[move[0]-4] = null;
            }
        }
        this.squares = squares;
    }

    stalemate() {
        if (all_legal_moves(1, this).length === 0 && all_legal_moves(2, this).length === 0) {
            return !(king_in_check(1, this) || king_in_check(2, this));
        }
    }

    white_has_won() {return all_legal_moves(2, this).length === 0 && king_in_check(2, this);}

    black_has_won() {return all_legal_moves(1, this).length === 0 && king_in_check(1, this);}

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
                    this.castling_now = true;
                }
            }
            else {
                this.black_king_position = move[1];
                this.can_castle_list[0] = false;
                this.can_castle_list[1] = false;
                if (Math.abs(move[1]-move[0]) === 2) {
                    this.black_has_castled = true;
                    this.castling_now = true;
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

    evaluate() {

        if (this.winner === "white") {
            return 1000;
        }

        else if (this.winner === "black") {
            return -1000;
        }

        else if (this.winner === "stalemate") {
            return 0;
        }

        let score = this.score;

        score += (63 - this.white_position_sum/this.white_pieces - this.black_positions_sum/this.black_pieces)*0.02;

        const white_moves = all_legal_moves(1, this);
        score += white_moves.length*0.03;

        const black_moves = all_legal_moves(2, this);
        score -= black_moves.length*0.03;

        const center = [27, 28, 35, 36];
        for (let i = 0; i < 4; i++) {
            for (let w = 0; w < white_moves.length; w++) {
                if (white_moves[w][1] === center[i]) {
                    score += 0.12;
                }
            }
            for (let b = 0; b < black_moves.length; b++) {
                if (black_moves[b][1] === center[i]) {
                    score -= 0.12;
                }
            }
        }

        if (this.white_has_castled) {
            score += 1;
        }

        if (this.black_has_castled) {
            score -= 1;
        }

        if (this.can_castle_list[0] || this.can_castle_list[1]) {
            score -= 0.3
        }

        if (this.can_castle_list[2] || this.can_castle_list[3]) {
            score += 0.3
        }
    }
}