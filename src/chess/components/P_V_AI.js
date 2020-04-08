import React from 'react';
import '../../index.css';
import Board_renderer from "./Board_renderer";
import Taken_pieces from "./Taken_pieces";
import is_legal_move from "../helpers/is_legal_move";
import initialize_board from "../helpers/initializers/initialize_board";
import initialize_squares from "../helpers/initializers/initialize_squares";
import update_all from "../helpers/updates/update_all";
import find_next_move from "../helpers/find_next_move";
import initialize_rendered_squares from "../helpers/initializers/initialize_rendered_squares";
import clear_colors from "../helpers/clear_colors";
import update_rendered_squares from "../helpers/updates/update_rendered_squares";

export default class P_V_AI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            white_positions: [59, 56, 63, 57, 62, 58, 61, 60, 52, 51, 53, 50, 54, 49, 55, 48],
            black_positions: [3, 0, 7, 1, 6, 2, 5, 4, 12, 11, 13, 10, 14, 9, 15, 8],
            squares: initialize_squares(),
            board: initialize_board(),
            rendered_squares: initialize_rendered_squares(),
            white_taken_pieces: [],
            black_taken_pieces: [],
            source_selection: -1,
            status: '',
            turn: 'white',
            ai_turn_text: "Det er din tur. Gjør no lurt!",
            winner: "",
            debug_1: "",
            debug_2: ""
        }
    }

    // sliter litt med positions

    // kan innføre number_of_pieces_developed - kan være en attribute i board

    // må innføre empty_piece for å kunne vise lovlige trekk når hvit har valgt en brikke

    // mangler noe logikk med rokkade - kan ikke sjekke om kongen er i sjakk eller om feltene mellom kongen og tårnet
    // er truet fordi da må jeg bruke metoden all_possible_moves, som igjen må bruke king.possible_moves -> evig loop

    // påningsbok hadde hjulpet mye - find_next_move bruker gjerne lengst tid på de første trekkene

    // mangler an passant - ganske easy
    // mangler bonde->dronning - ikke såå easy
    // mangler trekkgjentagelse og stillingsrepetisjon
    // kanskje tid/klokke hadde vært nais
    // mangler at brukeren skal kunne velge enten PvP eller PvAi
    // mangler at brukeren skal kunne velge farge hvis PvAi er valgt

    // hadde vært kult om man lagret alle squares slik at man kunne "bla" frem og tilbake blant trekkene


    handleClick(i) {
        const white_positions = this.state.white_positions.slice();
        const black_positions = this.state.black_positions.slice();
        const squares = this.state.squares.slice();
        const board = this.state.board.slice();
        const rendered_squares = this.state.rendered_squares.slice();

        if (board[1] === "white") {
            this.setState({
                winner: "white"
                // debug_1: "" + evaluate_board(this.state.board),
            });
        }

        else if (board[1] === "black") {
            this.setState({
                winner: "black"
                // debug_1: "" + evaluate_board(this.state.board),
            });
        }

        else if (board[1] === "stalemate") {
            this.setState({
                winner: "stalemate"
                // debug_1: "" + evaluate_board(this.state.board),
            });
        }

        else {
            if (this.state.turn === "white") {
                if (this.state.source_selection === -1) {
                    if (!squares[i] || squares[i].player !== 1) {
                        this.setState({status: "Du må velge en hvit brikke!"});
                    }
                    else {
                        rendered_squares[i].style = {...rendered_squares[i].style, backgroundColor: "RGB(80,220,100)"};

                        const moves = squares[i].possible_moves(i, squares, board);
                        for (let i = 0; i < moves.length; i++) {
                            rendered_squares[moves[i][1]].style = {...rendered_squares[moves[i][1]].style, backgroundColor: "RGB(80,220,100)"};
                        }

                        this.setState({
                            rendered_squares: rendered_squares,
                            status: "Hvor vil du flytte brikken?",
                            source_selection: i
                        });
                    }
                }

                else if (this.state.source_selection > -1) {
                    const cleared_squares = clear_colors(rendered_squares);
                    if (squares[i] && squares[i].player === 1) {
                        this.setState({
                            rendered_squares: cleared_squares,
                            status: "Du kan ikke flytte dit... Velg en ny hvit brikke!",
                            source_selection: -1,
                        });
                    }
                    else {
                        const move = [this.state.source_selection, i];
                        const moves = squares[this.state.source_selection].possible_moves(this.state.source_selection, squares, board);
                        let move_string = JSON.stringify(move);
                        let moves_string = JSON.stringify(moves);

                        if (moves_string.indexOf(move_string) !== -1 && is_legal_move(1, white_positions, black_positions, squares, board, move)) {

                            this.add_taken_piece(i);

                            const updated = update_all(white_positions, black_positions, squares, board, move);

                            const updated_rendered_squares = update_rendered_squares(cleared_squares, move);

                            // const x = updated[0];
                            // const y = updated[1];

                            this.setState({
                                white_positions: updated[0],
                                black_positions: updated[1],
                                squares: updated[2],
                                board: updated[3],
                                rendered_squares: updated_rendered_squares,
                                source_selection: -1,
                                status: '',
                                turn: "black",
                                ai_turn_text: "Det er svart sin tur. Vær tålmodig og la algoritmene jobbe litt!",
                                // debug_1: "" + x + y,
                                // debug_2: "" + x.length + y.length
                            });
                        }
                        else {
                            this.setState({
                                rendered_squares: cleared_squares,
                                status: "Du kan ikke flytte dit......... Velg en ny hvit brikke!",
                                source_selection: -1,
                            });
                        }
                    }
                }
            }
            else {

                const move = find_next_move(2, white_positions, black_positions, squares, board);

                this.add_taken_piece(move[1]);

                const updated = update_all(white_positions, black_positions, squares, board, move);

                const updated_rendered_squares = update_rendered_squares(rendered_squares, move);

                // const x = updated[0];
                // const y = updated[1];

                this.setState({
                    white_positions: updated[0],
                    black_positions: updated[1],
                    squares: updated[2],
                    board: updated[3],
                    rendered_squares: updated_rendered_squares,
                    source_selection: -1,
                    status: '',
                    turn: "white",
                    ai_turn_text: "Det er din tur. Gjør noe lurt!",
                    // debug_1: "" + x + y,
                    // debug_2: "" + x.length + y.length
                });
            }
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
                        <Taken_pieces taken_pieces = {this.state.white_taken_pieces} />
                    </div>
                    <div className="game_board">
                        <Board_renderer
                            squares = {this.state.rendered_squares}
                            onClick = {(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="taken_pieces">
                        <Taken_pieces taken_pieces = {this.state.black_taken_pieces} />
                    </div>
                    <div className="ai_turn_text">{this.state.ai_turn_text}</div>
                    <div className="game_status">{this.state.status}</div>
                    <div className="debug">Winner is {this.state.winner}</div>
                    <div className="debug">Debug 1: {this.state.debug_1}</div>
                    <div className="debug">Debug 2: {this.state.debug_2}</div>
                </div>
            </div>
        );
    }
}