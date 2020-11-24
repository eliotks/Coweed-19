import React from 'react';
import '../../index.css';
import Square from './Square.js';

export default class Board extends React.Component {

    render_square(i, square_shade) {
        return <Square
            key = {i}
            piece = {this.props.squares[i]}
            style = {this.props.squares[i] ? this.props.squares[i].style : null}
            shade = {square_shade}
            onClick={() => this.props.onClick(i)}
        />
    }

    render() {
        const board = [];
        for(let i = 0; i < 8; i++){
            const square_rows = [];
            for(let j = 0; j < 8; j++){
                const square_shade = (is_even(i) && is_even(j)) || (!is_even(i) && !is_even(j))? "light_square" : "dark_square";
                square_rows.push(this.render_square((i*8) + j, square_shade));
            }
            board.push(<div key={(i)}>{square_rows}</div>)
        }

        return (
            <div className="board">
                {board}
            </div>
        );
    }
}

function is_even(num){
    return num % 2 === 0
}