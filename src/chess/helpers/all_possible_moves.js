
export default function all_possible_moves(player, player_positions, squares, board) {
    const possible_moves = [];
    for (let i = 0; i < player_positions.length; i++) {
        const moves = squares[player_positions[i]].possible_moves(player_positions[i], squares, board);
        for (let y = 0; y < moves.length; y++) {
            possible_moves.push(moves[y]);
        }
    }
    return possible_moves;
}