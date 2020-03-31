
export default function all_possible_moves(player, board) {
    const possible_moves = [];
    for (let i = 0; i < 64; i++) {
        if (board.get_squares()[i] != null) {
            if (board.get_squares()[i].player === player) {
                const moves = board.get_squares()[i].possible_moves(i, board);
                for (let y = 0; y < moves.length; y++) {
                    possible_moves.push(moves[y]);
                }
            }
        }
    }
    return possible_moves;
}