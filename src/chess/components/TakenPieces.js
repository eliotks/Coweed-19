import React from 'react';
import '../../index.css';
import Square from './Square.js';

export default class TakenPieces extends React.Component {

    renderSquare(square, i) {
        return <Square
            piece = {square}
            style = {square.style}
        />
    }

    render() {
        return (
            <div>
                <div className="board_row">{this.props.taken_pieces.map((ws, index) =>
                    this.renderSquare(ws, index)
                )}</div>
            </div>
        );
    }
}