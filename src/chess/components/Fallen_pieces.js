import React from 'react';
import '../chess_index.css';
import Square from './Square.js';

export default class Fallen_pieces extends React.Component {

    renderSquare(square, i, squareShade) {
        return <Square
            piece = {square}
            style = {square.style}
        />
    }

    render() {
        return (
            <div>
                <div className="board-row">{this.props.whiteFallenSoldiers.map((ws, index) =>
                    this.renderSquare(ws, index)
                )}</div>
                <div className="board-row">{this.props.blackFallenSoldiers.map((bs, index) =>
                    this.renderSquare(bs, index)
                )}</div>
            </div>
        );
    }
}