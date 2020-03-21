import king_in_check from "./king_in_check";

export default function is_legal_move(move, squares) {
    squares = squares.slice();
    if (squares[move[0]] != null) {
        const player = squares[move[0]].player;
        squares[move[1]] = squares[move[0]];
        squares[move[0]] = null;
        return !king_in_check(player, squares)
    }
}