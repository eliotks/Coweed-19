export default class Piece {

    constructor(player, iconUrl) {
        this.player = player;
        this.style = {backgroundImage: "url('"+iconUrl+"')"};
    }

    possible_line_moves(source, squares, directions, steps) {
        const moves = [];
        for (let i = 0; i < 4; i++) {
            for (let y = 1; y <= steps[i]; y++) {
                if (squares[source + directions[i]*y] == null) {
                    moves.push([source, source + directions[i]*y]);
                }
                else {
                    if (squares[source + directions[i]*y].player === this.player) {
                        break;
                    }
                    moves.push([source, source + directions[i]*y]);
                    break;
                }
            }
        }
        return moves;
    }

    possible_one_step_moves(source, squares, directions) {
        const moves = [];
        for (let i = 0; i < directions.length; i++) {
            if (source + directions[i] > -1 && source + directions[i] < 64) {
                if (squares[source + directions[i]] == null) {
                    moves.push([source, source + directions[i]])
                }
                else if (squares[source + directions[i]].player !== this.player) {
                    moves.push([source, source + directions[i]])
                }
            }
        }
        return moves;
    }

}
