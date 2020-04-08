
export default function clear_colors(rendered_squares) {
    rendered_squares = rendered_squares.slice();
    for (let i = 0; i < 64; i++) {
        rendered_squares[i].style = {...rendered_squares[i].style, backgroundColor: ""};
    }
    return rendered_squares;
}