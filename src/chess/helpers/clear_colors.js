import is_light_square from "./is_light_square";

export default function clear_colors(rendered_squares, last_black_move) {
    rendered_squares = rendered_squares.slice();
    for (let i = 0; i < 64; i++) {
        rendered_squares[i].style = {...rendered_squares[i].style, backgroundColor: ""};
    }
    if (last_black_move != null) {
        for (let i = 0; i < 2 ; i++) {
            if (is_light_square(last_black_move[i])) {
                rendered_squares[last_black_move[i]].style = {...rendered_squares[last_black_move[i]].style, backgroundColor: "RGB(255,102,102)"};
            }
            else {
                rendered_squares[last_black_move[i]].style = {...rendered_squares[last_black_move[i]].style, backgroundColor: "RGB(160,60,60)"};
            }
        }
    }
    return rendered_squares;
}