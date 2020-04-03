import React from 'react';
import '../chess_index.css';
import Board_renderer from "./Board_renderer";
import Taken_pieces from "./Taken_pieces";
import is_legal_move from "../helpers/is_legal_move";
import initialize_board from "../helpers/initialize_board";
import all_legal_moves from "../helpers/all_legal_moves";
import initialize_squares from "../helpers/initialize_squares";
import update_squares_and_board from "../helpers/update_squares_and_board";

export default class P_V_AI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: initialize_squares(),
            board: initialize_board(),
            white_taken_pieces: [],
            black_taken_pieces: [],
            sourceSelection: -1,
            status: '',
            turn: 'white',
            ai_turn_text: "Det er din tur. Gjør no lurt!",
            winner: "",
            debug_1: "",
            debug_2: ""
        }
    }

    // Funker ikke atm - will fix


    // mangler noe logikk med rokkade - kan ikke sjekke om kongen er i sjakk eller om feltene mellom kongen og tårnet
    // er truet fordi da må jeg bruke metoden all_possible_moves, som igjen må bruke king.possible_moves -> evig loop

    // find_next_move vil ikke rokkere - hvorfor? kanskje kopieringen i find_next_move er overkill

    // kan potensielt spare kjøretid på å klone/kopiere et board-objekt istedenfor å initialisere nye objekter

    // mangler an passant - ganske easy
    // mangler bonde->dronning - ikke såå easy
    // mangler trekkgjentagelse og stillingsrepetisjon
    // kanskje tid/klokke hadde vært nais
    // mangler at brukeren skal kunne velge enten PvP eller PvAi
    // mangler at brukeren skal kunne velge farge hvis PvAi er valgt

    // hadde vært kult om man lagret alle squares slik at man kunne "bla" frem og tilbake blant trekkene


    handleClick(i) {
        const squares = this.state.squares.slice();
        const board = this.state.board.slice();

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
                if (this.state.sourceSelection === -1) {
                    if (!squares[i] || squares[i].player !== 1) {
                        this.setState({status: "Du må velge en hvit brikke!"});
                    }
                    else {
                        squares[i].style = {...squares[i].style, backgroundColor: "RGB(80,220,100)"};
                        this.setState({
                            squares: squares,
                            status: "Hvor vil du flytte brikken?",
                            sourceSelection: i
                        });
                    }
                }

                else if (this.state.sourceSelection > -1) {
                    squares[this.state.sourceSelection].style = {...squares[this.state.sourceSelection].style, backgroundColor: ""};
                    if (squares[i] && squares[i].player === 1) {
                        this.setState({
                            squares: squares,
                            status: "Du kan ikke flytte dit... Velg en ny hvit brikke!",
                            sourceSelection: -1,
                        });
                    }
                    else {
                        const move = [this.state.sourceSelection, i];
                        const moves = squares[this.state.sourceSelection].possible_moves(this.state.sourceSelection, squares, board);
                        let move_string = JSON.stringify(move);
                        let moves_string = JSON.stringify(moves);

                        if (moves_string.indexOf(move_string) !== -1 && is_legal_move(squares, board, move)) {
                            this.add_taken_piece(i);

                            const updated_squares_and_board = update_squares_and_board(squares, board, move);

                            this.setState({
                                squares: updated_squares_and_board[0],
                                board: updated_squares_and_board[1],
                                sourceSelection: -1,
                                status: '',
                                turn: "black",
                                ai_turn_text: "Det er svart sin tur. Vær tålmodig og la algoritmene jobbe litt!",
                                debug_1: ""
                            });
                        }
                        else {
                            this.setState({
                                squares: squares,
                                status: "Du kan ikke flytte dit......... Velg en ny hvit brikke!",
                                sourceSelection: -1,
                            });
                        }
                    }
                }
            }
            else {

                const black_moves = all_legal_moves(2, squares, board);
                const black_move = black_moves[Math.floor(Math.random()*black_moves.length)];

                this.add_taken_piece(black_move[1]);

                const updated_squares_and_board = update_squares_and_board(squares, board, black_move);

                this.setState({
                    squares: updated_squares_and_board[0],
                    board: updated_squares_and_board[1],
                    sourceSelection: -1,
                    status: '',
                    turn: "white",
                    ai_turn_text: "Det er din tur. Gjør noe lurt!",
                    debug_1: ""
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
                            squares = {this.state.squares}
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