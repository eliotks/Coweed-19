import React from 'react';
import '../chess_index.css';
import Board_renderer from "./Board_renderer";
import Taken_pieces from "./Taken_pieces";
import initializer from "../helpers/initializer";
import is_legal_move from "../helpers/is_legal_move";
import find_next_move from "../helpers/find_next_move";
import Board from "./Board";

export default class P_V_AI extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            board: new Board([initializer(), 0, null, 60, 4, [true, true, true, true], false, false]),
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



    // Funker ikke atm grunnet problemer med å kopiere/klone board-objekter i find_next_move :(



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


    handleClick(i){

        if (this.state.board.winner === "white") {
            this.setState({
                winner: "white"
            });
        }

        else if (this.state.board.winner === "black") {
            this.setState({
                winner: "black"
            });        }

        else if (this.state.board.winner === "stalemate") {
            this.setState({
                winner: "stalemate"
            });        }

        else {
            if (this.state.turn === "white") {
                if (this.state.sourceSelection === -1) {
                    if (!this.state.board.get_squares()[i] || this.state.board.get_squares()[i].player !== 1) {
                        this.setState({status: "Du må velge en hvit brikke!"});
                    }
                    else{
                        this.state.board.get_squares()[i].style = {...this.state.board.get_squares()[i].style, backgroundColor: "RGB(80,220,100)"};
                        this.setState({
                            status: "Hvor vil du flytte brikken?",
                            sourceSelection: i
                        });
                    }
                }

                else if (this.state.sourceSelection > -1) {
                    this.state.board.get_squares()[this.state.sourceSelection].style = {...this.state.board.get_squares()[this.state.sourceSelection].style, backgroundColor: ""};
                    if (this.state.board.get_squares()[i] && this.state.board.get_squares()[i].player === 1) {
                        this.setState({
                            status: "Du kan ikke flytte dit... Velg en ny hvit brikke!",
                            sourceSelection: -1,
                        });
                    }
                    else {
                        const move = [this.state.sourceSelection, i];
                        const moves = this.state.board.get_squares()[this.state.sourceSelection].possible_moves(this.state.sourceSelection, this.state.board);
                        let move_string = JSON.stringify(move);
                        let moves_string = JSON.stringify(moves);

                        if (moves_string.indexOf(move_string) !== -1 && is_legal_move(move, this.state.board)) {
                            this.add_taken_piece(i);

                            this.state.board.update_board(move);

                            this.setState({
                                sourceSelection: -1,
                                status: '',
                                turn: "black",
                                ai_turn_text: "Det er svart sin tur. Vær tålmodig og la algoritmene jobbe litt!"
                            });
                        }
                        else {
                            this.setState({
                                status: "Du kan ikke flytte dit... Velg en ny hvit brikke!",
                                sourceSelection: -1,
                            });
                        }
                    }
                }
            }
            else {
                let black_move = find_next_move(this.state.board, 2);

                this.add_taken_piece(black_move[1]);

                this.state.board.update_board(black_move);

                this.setState({
                    sourceSelection: -1,
                    status: '',
                    turn: "white",
                    ai_turn_text: "Det er din tur. Gjør noe lurt!",
                    debug_1: "" + this.state.board.evaluate()
                });
            }
        }
    }

    add_taken_piece(i) {
        const white_taken_pieces = this.state.white_taken_pieces.slice();
        const black_taken_pieces = this.state.black_taken_pieces.slice();
        if (this.state.board.squares[i] != null) {
            if (this.state.board.squares[i].player === 1) {
                white_taken_pieces.push(this.state.board.get_squares()[i]);
            }
            else {
                black_taken_pieces.push(this.state.board.get_squares()[i]);
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
                            squares = {this.state.board.squares}
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