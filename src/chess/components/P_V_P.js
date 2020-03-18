import React from 'react';

import '../chess_index.css';
import Board from "./Board";
import Taken_pieces from "./Taken_pieces";
import Initializer from "../helpers/Initializer";

export default class P_V_P extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Initializer(),
            white_taken_pieces: [],
            black_taken_pieces: [],
            player: 1,
            sourceSelection: -1,
            status: '',
            turn: 'white'
        }
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
                const white_taken_pieces = this.state.white_taken_pieces.slice();
                const black_taken_pieces = this.state.black_taken_pieces.slice();
                const isDestEnemyOccupied = !!squares[i];
                const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
                const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
                const isMoveLegal = this.isMoveLegal(srcToDestPath);

                if(isMovePossible && isMoveLegal){
                    if(squares[i] !== null){
                        if(squares[i].player === 1){
                            white_taken_pieces.push(squares[i]);
                        }
                        else{
                            black_taken_pieces.push(squares[i]);
                        }
                    }
                    squares[i] = squares[this.state.sourceSelection];
                    squares[this.state.sourceSelection] = null;
                    let player = this.state.player === 1? 2: 1;
                    let turn = this.state.turn === 'white'? 'black' : 'white';
                    this.setState({
                        sourceSelection: -1,
                        squares: squares,
                        white_taken_pieces: white_taken_pieces,
                        black_taken_pieces: black_taken_pieces,
                        player: player,
                        status: '',
                        turn: turn
                    });
                }
                else{
                    this.setState({
                        status: "Wrong selection. Choose valid source and destination again.",
                        sourceSelection: -1,
                    });
                }
            }
        }

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
                    <div id="player_turn_box" style={{backgroundColor: this.state.turn}}/>
                    <div className="game_status">{this.state.status}</div>
                </div>
            </div>
        );
    }
}