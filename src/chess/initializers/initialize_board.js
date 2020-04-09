
export default function initialize_board() {

    // board[0] = score
    // board[1] = turn
    // board[2] = white_king_position
    // board[3] = black_king_position

    // board[4] = can_castle_list (0)
    // board[5] = can_castle list (1)
    // board[6] = can_castle_list (2)
    // board[7] = can_castle_list (3)

    // board[8] = white_has_castled
    // board[9] = black_has_castled
    // board[10] = castling_now

    // board[11] = white_pieces
    // board[12] = black_pieces
    // board[13] = white_position_sum
    // board[14] = black_position_sum

    // could use dictionary - can you .slice() a dictionary?

    const board = [];

    board.push(0);
    board.push(1);
    board.push(60);
    board.push(4);
    board.push(true);
    board.push(true);
    board.push(true);
    board.push(true);
    board.push(false);
    board.push(false);
    board.push(false);
    board.push(16);
    board.push(16);
    board.push(888);
    board.push(120);

    return board;
}