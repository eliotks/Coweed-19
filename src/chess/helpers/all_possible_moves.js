
export default function all_possible_moves(player, squares, board) {
    const possible_moves = [];
    for (let i = 0; i < 64; i++) {
        if (squares[i] != null) {
            if (squares[i].player === player) {
                const moves = squares[i].possible_moves(i, squares, board);
                for (let y = 0; y < moves.length; y++) {
                    possible_moves.push(moves[y]);
                }
            }
        }
    }
    return possible_moves;
}