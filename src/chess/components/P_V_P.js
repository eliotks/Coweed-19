import React from 'react';
import '../../index.css';
import Board from "./Board";
import TakenPieces from "./TakenPieces";
import is_legal_move from "../moves/is_legal_move";
import initialize_board from "../initializers/initialize_board";
import initialize_squares from "../initializers/initialize_squares";
import update_all from "../updates/update_all";
import clear_colors from "../helpers/clear_colors";
import update_rendered_squares from "../updates/update_rendered_squares";
import is_light_square from "../helpers/is_light_square";
import white_has_won from "../game_over/white_has_won";
import black_has_won from "../game_over/black_has_won";
import stalemate from "../game_over/stalemate";
import opposite_player from "../helpers/opposite_player";
import evaluate_board from "../helpers/evaluate_board";

export default class P_V_P extends React.Component {
    constructor(props) {
        super(props);
        const top_positions = [3, 0, 7, 1, 6, 2, 5, 4, 12, 11, 13, 10, 14, 9, 15, 8];
        const bottom_positions = [59, 56, 63, 57, 62, 58, 61, 60, 52, 51, 53, 50, 54, 49, 55, 48];
        const white_positions = this.props.player === 1 ? bottom_positions : top_positions;
        const black_positions = this.props.player === 1 ? top_positions : bottom_positions;
        this.state = {
            white_positions: white_positions,
            black_positions: black_positions,
            squares: initialize_squares(this.props.player, false),
            board: initialize_board(this.props.player),
            rendered_squares: initialize_squares(this.props.player, true),
            all_squares: [],
            current_squares: 0,
            last_squares: 0,
            all_moves: [],
            white_taken_pieces: [],
            black_taken_pieces: [],
            source_selection: -1,
            status: '',
            winner: "ingen foreløpig.",
            turn: 1,
            debug_1: "",
            debug_2: ""
        };
        this.state.all_squares.push(this.state.rendered_squares.slice())
    }

    // kult om brettet snus hver gang man flytter, slik at spilleren som skal flytte alltid har brikkene sine nederst
    // må lage en funksjon som snur brettet

    handle_click(i) {
        if (this.state.current_squares === this.state.last_squares) {
            const white_positions = this.state.white_positions.slice();
            const black_positions = this.state.black_positions.slice();
            const squares = this.state.squares.slice();
            const board = this.state.board.slice();
            const rendered_squares = this.state.rendered_squares.slice();

            if (white_has_won(white_positions, black_positions, squares, board)) {
                this.setState({
                    winner: "hvit!"
                    // debug_1: "" + evaluate_board(this.state.board),
                });
            }

            else if (black_has_won(white_positions, black_positions, squares, board)) {
                this.setState({
                    winner: "svart!"
                    // debug_1: "" + evaluate_board(this.state.board),
                });
            }

            else if (stalemate(white_positions, black_positions, squares, board)) {
                this.setState({
                    winner: "ingen. Det ble patt!"
                    // debug_1: "" + evaluate_board(this.state.board),
                });
            }

            else {
                if (this.state.source_selection === -1) {
                    if (!squares[i] || squares[i].player !== this.state.turn) {
                        this.setState({status: "Du må velge din brikke!"});
                    }
                    else {
                        if (is_light_square(i)) {
                            rendered_squares[i].style = {...rendered_squares[i].style, backgroundColor: "RGB(80,220,100)"};
                        }
                        else {
                            rendered_squares[i].style = {...rendered_squares[i].style, backgroundColor: "RGB(0,150,30)"};
                        }
                        const moves = squares[i].possible_moves(i, squares, board, white_positions, black_positions);
                        for (let i = 0; i < moves.length; i++) {
                            if (is_legal_move(this.state.turn, white_positions, black_positions, squares, board, moves[i])) {
                                if (is_light_square(moves[i][1])) {
                                    rendered_squares[moves[i][1]].style = {...rendered_squares[moves[i][1]].style, backgroundColor: "RGB(80,220,100)"};
                                }
                                else {
                                    rendered_squares[moves[i][1]].style = {...rendered_squares[moves[i][1]].style, backgroundColor: "RGB(0,150,30)"};
                                }
                            }
                        }
                        this.setState({
                            rendered_squares: rendered_squares,
                            status: "Hvor vil du flytte brikken?",
                            source_selection: i
                        });
                    }
                }

                else if (this.state.source_selection > -1) {
                    const cleared_squares = clear_colors(rendered_squares, null);
                    if (squares[i] && squares[i].player === this.state.turn) {
                        if (this.state.source_selection === i) {
                            this.setState({
                                rendered_squares: cleared_squares,
                                status: "Du kan ikke flytte dit. Velg en ny hvit brikke!",
                                source_selection: -1,
                            });
                        }
                        else {
                            if (is_light_square(i)) {
                                rendered_squares[i].style = {...rendered_squares[i].style, backgroundColor: "RGB(80,220,100)"};
                            }
                            else {
                                rendered_squares[i].style = {...rendered_squares[i].style, backgroundColor: "RGB(0,150,30)"};
                            }
                            const moves = squares[i].possible_moves(i, squares, board, white_positions, black_positions);
                            for (let i = 0; i < moves.length; i++) {
                                if (is_legal_move(this.state.turn, white_positions, black_positions, squares, board, moves[i])) {
                                    if (is_light_square(moves[i][1])) {
                                        rendered_squares[moves[i][1]].style = {...rendered_squares[moves[i][1]].style, backgroundColor: "RGB(80,220,100)"};
                                    }
                                    else {
                                        rendered_squares[moves[i][1]].style = {...rendered_squares[moves[i][1]].style, backgroundColor: "RGB(0,150,30)"};
                                    }
                                }
                            }
                            this.setState({
                                rendered_squares: rendered_squares,
                                status: "Hvor vil du flytte brikken?",
                                source_selection: i
                            });
                        }
                    }
                    else {
                        const move = [this.state.source_selection, i];
                        const moves = squares[this.state.source_selection].possible_moves(this.state.source_selection, squares, board, white_positions, black_positions);
                        let move_string = JSON.stringify(move);
                        let moves_string = JSON.stringify(moves);

                        if (moves_string.indexOf(move_string) !== -1 && is_legal_move(this.state.turn, white_positions, black_positions, squares, board, move)) {

                            this.add_taken_piece(i);

                            const updated = update_all(white_positions, black_positions, squares, board, move);

                            const updated_rendered_squares = update_rendered_squares(clear_colors(rendered_squares, null), move, this.props.player);

                            const all_squares = this.state.all_squares;
                            all_squares.push(updated_rendered_squares.slice());

                            const all_moves = this.state.all_moves;
                            all_moves.push(move);

                            this.setState({
                                white_positions: updated[0],
                                black_positions: updated[1],
                                squares: updated[2],
                                board: updated[3],
                                rendered_squares: updated_rendered_squares,
                                all_squares: all_squares,
                                current_squares: this.state.current_squares + 1,
                                last_squares: this.state.last_squares + 1,
                                all_moves: all_moves,
                                source_selection: -1,
                                status: '',
                                turn: opposite_player(this.state.turn),
                                // debug_1: "" + evaluate_board(updated[0], updated[1], updated[2], updated[3]),
                                // debug_2:
                            });
                        }
                        else {
                            this.setState({
                                rendered_squares: cleared_squares,
                                status: "Du kan ikke flytte dit. Velg en ny hvit brikke!",
                                source_selection: -1,
                            });
                        }
                    }
                }
            }
        }
        else {
            this.setState({
                status: "Du kan ikke gjøre trekket ditt nå. Trykk på '>|' helt til høyre for å kunne gjøre trekket ditt!"
            });
        }
    }

    first_squares() {
        if (this.state.board[1] === 1) {
            this.setState({
                current_squares: 0,
                rendered_squares: clear_colors(this.state.all_squares[0])
            });
        }
    }

    previous_squares() {
        if (this.state.board[1] === 1) {
            if (this.state.current_squares > 0) {
                this.setState({
                    current_squares: this.state.current_squares-1,
                    rendered_squares: clear_colors(this.state.all_squares[this.state.current_squares-1], this.state.all_moves[this.state.current_squares-2])
                });
            }
        }
    }

    next_squares() {
        if (this.state.board[1] === 1){
            if (this.state.current_squares < this.state.last_squares) {
                this.setState({
                    current_squares: this.state.current_squares+1,
                    rendered_squares: clear_colors(this.state.all_squares[this.state.current_squares+1], this.state.all_moves[this.state.current_squares])
                });
            }
        }
    }

    latest_squares() {
        if (this.state.board[1] === 1) {
            this.setState({
                current_squares: this.state.last_squares,
                rendered_squares: clear_colors(this.state.all_squares[this.state.last_squares], this.state.all_moves[this.state.last_squares-1])
            });
        }
    }

    add_taken_piece(i) {
        const squares = this.state.squares.slice();
        const white_taken_pieces = this.state.white_taken_pieces.slice();
        const black_taken_pieces = this.state.black_taken_pieces.slice();
        if (squares[i] != null) {
            if (squares[i].player === 1) {
                white_taken_pieces.push(squares[i]);
            }
            else {
                black_taken_pieces.push(squares[i]);
            }
        }
        this.setState({
            white_taken_pieces: white_taken_pieces,
            black_taken_pieces: black_taken_pieces,
        });
    }


    render() {
        return (
            <div>
                <div className="game">
                    <div className="taken_pieces">
                        <TakenPieces taken_pieces = {this.state.white_taken_pieces} />
                    </div>
                    <div className="game_board">
                        <div className="buttons">
                            <button className="button" onClick={(i) => this.first_squares()}>I&lt;</button>
                            <button className="button" onClick={(i) => this.previous_squares()}>&lt;</button>
                        </div>
                        <Board
                            squares = {this.state.rendered_squares}
                            onClick = {(i) => this.handle_click(i)}
                        />
                        <div className="buttons">
                            <button className="button" onClick={(i) => this.next_squares()}>&gt;</button>
                            <button className="button" onClick={(i) => this.latest_squares()}>&gt;I</button>
                        </div>
                    </div>
                    <div className="taken_pieces">
                        <TakenPieces taken_pieces = {this.state.black_taken_pieces} />
                    </div>
                    <div className="game_status">{this.state.status}</div>
                    <div className="debug">Vinneren er {this.state.winner}</div>
                    <div className="debug">{this.state.debug_1}</div>
                    <div className="debug">{this.state.debug_2}</div>
                </div>
            </div>
        );
    }
}