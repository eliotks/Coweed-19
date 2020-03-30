import React from 'react';
import '../chess_index.css';
import Square from './Square.js';

export default class Board_renderer extends React.Component {

    renderSquare(i, squareShade) {
        return <Square
            piece = {this.props.squares[i]}
            style = {this.props.squares[i]? this.props.squares[i].style : null}
            shade = {squareShade}
            onClick={() => this.props.onClick(i)}
        />
    }

    render() {
        const board = [];
        for(let i = 0; i < 8; i++){
            const squareRows = [];
            for(let j = 0; j < 8; j++){
                const squareShade = (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))? "light_square" : "dark_square";
                squareRows.push(this.renderSquare((i*8) + j, squareShade));
            }
            board.push(<div className="board_row">{squareRows}</div>)
        }

        return (
            <div>
                {board}
            </div>
        );
    }
}

function isEven(num){
    return num % 2 === 0
}