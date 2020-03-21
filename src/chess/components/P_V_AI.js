import React from 'react';
import '../chess_index.css';
import Board from "./Board";
import Taken_pieces from "./Taken_pieces";
import initializer from "../helpers/initializer";
import all_legal_moves from "../helpers/all_legal_moves";
import is_legal_move from "../helpers/is_legal_move";
import find_next_move from "../helpers/find_next_move";

export default class P_V_AI extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: initializer(),
            white_taken_pieces: [],
            black_taken_pieces: [],
            sourceSelection: -1,
            status: '',
            turn: 'white',
            ai_turn_text: "Det er din tur. Gjør no lurt!",
            debug_1: "",
            debug_2: ""
        }
    }

    // mangler rokkade - easy
    // mangler an passant - ganske easy
    // mangler patt _ hvertfall easy
    // mangler sjakkmatt - eeeasy
    // mangler bonde->dronning - ikke såå easy
    // mangler trekkgjentagelse og stillingsrepetisjon
    // kanskje tid/klokke hadde vært nais
    // mangler at brukeren skal kunne velge enten PvP eller PvAi
    // mangler at brukeren skal kunne velge farge hvis PvAi er valgt
    // mangler en grov AI

    handleClick(i){
        const squares = this.state.squares.slice();

        if (this.state.turn === "white") {
            if (this.state.sourceSelection === -1) {
                if (!squares[i] || squares[i].player !== 1) {
                    this.setState({status: "Du må velge en hvit brikke!"});
                    if (squares[i]) {
                        squares[i].style = {...squares[i].style, backgroundColor: ""};
                    }
                }
                else{
                    squares[i].style = {...squares[i].style, backgroundColor: "RGB(80,220,100)"};
                    this.setState({
                        status: "Hvor vil du flytte brikken?",
                        sourceSelection: i
                    });
                }
            }

            else if (this.state.sourceSelection > -1) {
                squares[this.state.sourceSelection].style = {...squares[this.state.sourceSelection].style, backgroundColor: ""};
                if (squares[i] && squares[i].player === 1) {
                    this.setState({
                        status: "Du kan ikke flytte dit... Velg en ny hvit brikke!",
                        sourceSelection: -1,
                    });
                }
                else {
                    const squares = this.state.squares.slice();

                    const move = [this.state.sourceSelection, i];
                    const moves = squares[this.state.sourceSelection].possible_moves(this.state.sourceSelection, squares);
                    let move_string = JSON.stringify(move);
                    let moves_string = JSON.stringify(moves);

                    if (moves_string.indexOf(move_string) !== -1 && is_legal_move(move, squares)) {
                        this.add_taken_piece(i);
                        squares[i] = squares[this.state.sourceSelection];
                        squares[this.state.sourceSelection] = null;
                        this.setState({
                            sourceSelection: -1,
                            squares: squares,
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
            const squares = this.state.squares.slice();

            const legal_moves = all_legal_moves(2, squares);

            this.setState({
                debug_1: "yo" + legal_moves.length
            });

            if (legal_moves.length === 0) {
                // patt eller matt
            }
            else {
                let black_move = find_next_move(squares, 2);

                const source = black_move[0];
                const dest = black_move[1];

                this.add_taken_piece(dest);

                squares[dest] = squares[source];
                squares[source] = null;

                this.setState({
                    sourceSelection: -1,
                    squares: squares,
                    status: '',
                    turn: "white",
                    ai_turn_text: "Det er din tur. Gjør noe lurt!"
                });
            }
        }
    }

    add_taken_piece(i) {
        const squares = this.state.squares;
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
                        <Board
                            squares = {this.state.squares}
                             onClick = {(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="taken_pieces">
                        <Taken_pieces taken_pieces = {this.state.black_taken_pieces} />
                    </div>
                    <div className="ai_turn_text">{this.state.ai_turn_text}</div>
                    <div className="game_status">{this.state.status}</div>
                    <div className="debug">Debug 1: {this.state.debug_1}</div>
                    <div className="debug">Debug 2: {this.state.debug_2}</div>
                </div>
            </div>
        );
    }
}