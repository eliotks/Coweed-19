
export default function All_legal_moves(player, squares) {

    const all_legal_moves = [];

    function all_possible_moves(player, squares) {
        const possible_moves = [];
        for (let i = 0; i < 64; i++) {
            if (squares[i] != null) {
                if (squares[i].player === player) {
                    const moves = squares[i].possible_moves(i, squares);
                    for (let y = 0; y < moves.length; y++) {
                        possible_moves.push(moves[y]);
                    }
                }
            }
        }
        return possible_moves;
    }

    function opposite_player(player) {
        return player === 1 ? 2 : 1;
    }

    function king_in_check(player, squares) {
        let position = 0;
        for (let i = 0; i < 64; i++) {
            if (squares[i] != null) {
                if (squares[i].score === 100 && squares[i].player === player) {
                    position = i;
                    break;
                }
            }
        }
        const enemy_moves = all_possible_moves(opposite_player(player), squares);
        if (enemy_moves.length === 0) {
            // patt eller matt
        }
        else {
            for (let i = 0; i < enemy_moves.length; i++) {
                if (enemy_moves[i][1] === position) {
                    return true;
                }
            }
        }
        return false;
    }

    function is_legal_move(move, squares) {
        squares = squares.slice();
        if (squares[move[0]] != null) {
            const player = squares[move[0]].player;
            squares[move[1]] = squares[move[0]];
            squares[move[0]] = null;
            return !king_in_check(player, squares)
        }
    }

    const possible_moves = all_possible_moves(player, squares);

    for (let i = 0; i < possible_moves.length; i++) {
        if (is_legal_move(possible_moves[i], squares)) {
            all_legal_moves.push(possible_moves[i]);
        }
    }

    return all_legal_moves;
}