import Empty_piece from "../pieces/Empty_piece";
import is_light_square from "../helpers/is_light_square";

export default function update_rendered_squares(rendered_squares, move) {

    rendered_squares = rendered_squares.slice();

    if (rendered_squares[move[0]].score === 1 && rendered_squares[move[1]].player === 0 && (Math.abs(move[1]-move[0]) % 2) === 1) {
        if (move[1]-move[0] === -7 || move[1]-move[0] === 9) {
            rendered_squares[move[0]+1] = new Empty_piece();
        }
        else if (move[1]-move[0] === 7 || move[1]-move[0] === -9) {
            rendered_squares[move[0]-1] = new Empty_piece();
        }
    }

    if (rendered_squares[move[0]].score === 100) {
        if (move[1] - move[0] === 2) {
            rendered_squares[move[0]+1] = rendered_squares[move[0]+3];
            rendered_squares[move[0]+3] = new Empty_piece();
        }
        else if (move[0] - move[1] === 2) {
            rendered_squares[move[0]-1] = rendered_squares[move[0]-4];
            rendered_squares[move[0]-4] = new Empty_piece();
        }
    }

    rendered_squares[move[1]] = rendered_squares[move[0]];
    rendered_squares[move[0]] = new Empty_piece();

    for (let i = 0; i < 2 ; i++) {
        if (is_light_square(move[i])) {
            rendered_squares[move[i]].style = {...rendered_squares[move[i]].style, backgroundColor: "RGB(255,102,102)"};
        }
        else {
            rendered_squares[move[i]].style = {...rendered_squares[move[i]].style, backgroundColor: "RGB(160,60,60)"};
        }
    }
    return rendered_squares;
}