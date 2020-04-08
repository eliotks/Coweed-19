import Empty_piece from "../../pieces/Empty_piece";

export default function update_rendered_squares(rendered_squares, move) {
    rendered_squares = rendered_squares.slice();
    rendered_squares[move[1]] = rendered_squares[move[0]];
    rendered_squares[move[0]] = new Empty_piece();
    for (let i = 0; i < 2 ; i++) {
        rendered_squares[move[i]].style = {...rendered_squares[move[i]].style, backgroundColor: "RGB(255,102,102)"};
    }
    return rendered_squares;
}