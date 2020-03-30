
export default function get_board_attributes(board) {
    return [board.squares, board.score, board.winner, board.white_booleans, board.black_booleans]
}