
export default function get_board_attributes(board) {
    return [board.squares.slice(), board.score, board.winner, board.white_king_position, board.black_king_position,
    board.can_castle_list.slice(), board.white_has_castled, board.black_has_castled, board.white_pieces,
    board.black_pieces, board.white_position_sum, board.black_position_sum].slice();
}