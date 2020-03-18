import React from 'react';

import '../chess_index.css';
import Board from "./Board";
import Taken_pieces from "./Taken_pieces";
import Initializer from "../helpers/Initializer";

export default class P_V_AI extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Initializer(),
            white_taken_pieces: [],
            black_taken_pieces: [],
            sourceSelection: -1,
            status: '',
            turn: 'white',
            ai_turn_text: "Det er din tur. Gjør no lurt!"
        }
    }

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
                    const white_taken_pieces = this.state.white_taken_pieces.slice();
                    const black_taken_pieces = this.state.black_taken_pieces.slice();
                    const isDestEnemyOccupied = !!squares[i];
                    const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
                    const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
                    const isMoveLegal = this.isMoveLegal(srcToDestPath);

                    if (isMovePossible && isMoveLegal) {
                        if (squares[i] !== null) {
                            if (squares[i].player === 1) {
                                white_taken_pieces.push(squares[i]);
                            }
                            else {
                                black_taken_pieces.push(squares[i]);
                            }
                        }
                        squares[i] = squares[this.state.sourceSelection];
                        squares[this.state.sourceSelection] = null;
                        this.setState({
                            sourceSelection: -1,
                            squares: squares,
                            white_taken_pieces: white_taken_pieces,
                            black_taken_pieces: black_taken_pieces,
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
            this.makeBlackMove(10, 26)
        }
    }

    makeBlackMove(source, dest) {
        const squares = this.state.squares.slice();
        const white_taken_pieces = this.state.white_taken_pieces.slice();
        const black_taken_pieces = this.state.black_taken_pieces.slice();

        squares[dest] = squares[source];
        squares[source] = null;
        this.setState({
            sourceSelection: -1,
            squares: squares,
            white_taken_pieces: white_taken_pieces,
            black_taken_pieces: black_taken_pieces,
            status: '',
            turn: "white",
            ai_turn_text: "Det er din tur. Gjør noe lurt!"
        });
    }

    isMoveLegal(srcToDestPath){
        let isLegal = true;
        for(let i = 0; i < srcToDestPath.length; i++){
            if(this.state.squares[srcToDestPath[i]] !== null){
                isLegal = false;
            }
        }
        return isLegal;
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
                </div>
            </div>
        );
    }
}