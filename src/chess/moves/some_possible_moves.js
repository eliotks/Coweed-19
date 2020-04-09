// all possible moves except the moves of the king - needed to check if castling is blocked or not

export default function some_possible_moves(player, white_positions, black_positions, squares, board) {

    const possible_moves = [];

    let player_positions;

    if (player === 1) {
        player_positions = white_positions.slice();
        const index = player_positions.indexOf(board[2]);
        player_positions.splice(index, 1);
    }
    else {
        player_positions = black_positions.slice();
        const index = player_positions.indexOf(board[3]);
        player_positions.splice(index, 1);
    }

    for (let i = 0; i < player_positions.length; i++) {
        const moves = squares[player_positions[i]].possible_moves(player_positions[i], squares, board, white_positions, black_positions);
        for (let y = 0; y < moves.length; y++) {
            possible_moves.push(moves[y]);
        }
    }

    return possible_moves;
}