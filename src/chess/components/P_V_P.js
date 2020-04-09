import React from 'react';

import '../../index.css';
import Board from "./Board";
import TakenPieces from "./TakenPieces";
import Initialize_squares from "../initializers/initialize_squares";
import is_legal_move from "../helpers/is_legal_move";

export default class P_V_P extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Initialize_squares(),
            white_taken_pieces: [],
            black_taken_pieces: [],
            player: 1,
            sourceSelection: -1,
            status: '',
            turn: 'white',
            debug: ""
        }
    }

    // trenger en update

    add_taken_piece(i) {
        const squares = this.state.squares;
        const white_taken_pieces = this.state.white_taken_pieces.slice();
        const black_taken_pieces = this.state.black_taken_pieces.slice();
        if (squares[i] !== null) {
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

    handleClick(i){
        const squares = this.state.squares.slice();

        if(this.state.sourceSelection === -1){
            if(!squares[i] || squares[i].player !== this.state.player){
                this.setState({status: "Wrong selection. Choose player " + this.state.player + " pieces."});
                if (squares[i]) {
                    squares[i].style = {...squares[i].style, backgroundColor: ""};
                }
            }
            else{
                squares[i].style = {...squares[i].style, backgroundColor: "RGB(80,220,100)"};
                this.setState({
                    status: "Choose destination for the selected piece",
                    sourceSelection: i
                });
            }
        }

        else if(this.state.sourceSelection > -1){
            squares[this.state.sourceSelection].style = {...squares[this.state.sourceSelection].style, backgroundColor: ""};
            if(squares[i] && squares[i].player === this.state.player){
                this.setState({
                    status: "Wrong selection. Choose valid source and destination again.",
                    sourceSelection: -1,
                });
            }
            else{
                const squares = this.state.squares.slice();

                const move = [this.state.sourceSelection, i];
                const moves = squares[this.state.sourceSelection].possible_moves(this.state.sourceSelection, squares);
                let move_string = JSON.stringify(move);
                let moves_string = JSON.stringify(moves);


                if (moves_string.indexOf(move_string) !== -1 && is_legal_move(move, squares)) {
                    this.add_taken_piece(i);
                    squares[i] = squares[this.state.sourceSelection];
                    squares[this.state.sourceSelection] = null;

                    if (squares[i].score === 5 || squares[i].score === 100) {
                        squares[i].has_not_moved = false;
                        if (squares[i].score === 100 && i - this.state.sourceSelection === 2) {
                            squares[i-1] = squares[i+1];
                            squares[i+1] = null;
                            squares[i].has_castled = true;
                        }
                        else if (squares[i].score === 100 && this.state.sourceSelection - i === 2) {
                            squares[i+1] = squares[i-2];
                            squares[i-2] = null;
                            squares[i].has_castled = true;
                        }
                    }

                    let player = this.state.player === 1 ? 2 : 1;
                    this.setState({
                        sourceSelection: -1,
                        player: player,
                        squares: squares,
                        status: '',
                        turn: "black",
                        ai_turn_text: "Det er svart sin tur."
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

    render() {

        return (
            <div>
                <div className="game">
                    <div className="taken_pieces">
                        <TakenPieces taken_pieces = {this.state.white_taken_pieces} />
                    </div>
                    <div className="game_board">
                        <Board
                            squares = {this.state.squares}
                            onClick = {(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="taken_pieces">
                        <TakenPieces taken_pieces = {this.state.black_taken_pieces} />
                    </div>
                    <div id="player_turn_box" style={{backgroundColor: this.state.turn}}/>
                    <div className="game_status">{this.state.status}</div>
                    <div className="debug">Debug: {this.state.debug}</div>
                </div>
            </div>
        );
    }
}