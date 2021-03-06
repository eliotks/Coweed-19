import React, {Component} from 'react';
import '../../index.css';
import Board from "./Board";
import TakenPieces from "./TakenPieces";
import is_legal_move from "../moves/is_legal_move";
import initialize_board from "../initializers/initialize_board";
import initialize_squares from "../initializers/initialize_squares";
import update_all from "../updates/update_all";
import find_next_move from "../moves/find_next_move";
import clear_colors from "../helpers/clear_colors";
import update_rendered_squares from "../updates/update_rendered_squares";
import is_light_square from "../helpers/is_light_square";
import white_has_won from "../game_over/white_has_won";
import black_has_won from "../game_over/black_has_won";
import stalemate from "../game_over/stalemate";
import opposite_player from "../helpers/opposite_player";

export default class P_V_AI extends Component {
    constructor(props) {
        super(props);
        const top_positions = [3, 0, 7, 1, 6, 2, 5, 4, 12, 11, 13, 10, 14, 9, 15, 8];
        const bottom_positions = [59, 56, 63, 57, 62, 58, 61, 60, 52, 51, 53, 50, 54, 49, 55, 48];
        const white_positions = this.props.player === 1 ? bottom_positions : top_positions;
        const black_positions = this.props.player === 1 ? top_positions : bottom_positions;
        let text;
        if (this.props.player === 1) {
            text = "It is your turn!";
        }
        else {
            text = "Click anywhere on the board to start the game!";
        }
        this.state = {
            white_positions: white_positions,
            black_positions: black_positions,
            squares: initialize_squares(this.props.player, false),
            board: initialize_board(this.props.player),
            rendered_squares: initialize_squares(this.props.player, true),
            all_squares: [],
            current_squares: 0,
            last_squares: 0,
            last_move: null,
            all_moves: [],
            all_taken_pieces: [],
            white_taken_pieces: [],
            black_taken_pieces: [],
            source_selection: -1,
            status: text,
            winner: ""
        };
        this.state.all_squares.push(this.state.rendered_squares.slice())
    }

    // update_board tar ikke hensyn til position_sum ved rokkade

    // iterative deepening? move ordering og transition table?

    // må finne ut hvordan svart kan gjøre trekket sitt uten at brukeren må trykke
    //  - funker ikke å kjøre svart sitt trekk rett etter hvit sitt trekk
    //     - dette er fordi brettet oppdateres kun etter at handle_click har kjørt ferdig

    // kan innføre number_of_pieces_developed - kan være en attribute i board

    // åpningsbok hadde hjulpet mye - find_next_move bruker gjerne lengst tid på de første trekkene

    // mangler at man skal kunne velge hvilken brikke bonden skal bli til når man 'queener'

    // mangler trekkgjentagelse og stillingsrepetisjon
    // kanskje tid/klokke hadde vært nais

    // virker som man kan ta rokkade mens man står i sjakk - ikke bra


    handle_click(i) {
        if (this.state.current_squares === this.state.last_squares) {
            const white_positions = this.state.white_positions.slice();
            const black_positions = this.state.black_positions.slice();
            const squares = this.state.squares.slice();
            const board = this.state.board.slice();
            const rendered_squares = this.state.rendered_squares.slice();
            if (!this.game_over(white_positions, black_positions, squares, board)) {
                if (board[1] === this.props.player) {
                    this.move(i, white_positions, black_positions, squares, board, rendered_squares);
                }
                else {
                    this.next_move(white_positions, black_positions, squares, board, rendered_squares);
                }
            }
        }
        else {
            this.setState({
                status: "Press '>|' in order to be able to make a move."
            });
        }
    }

    move(i, white_positions, black_positions, squares, board, rendered_squares) {
        
        if (this.state.source_selection === -1) {
            if (!squares[i] || squares[i].player !== this.props.player) {
                let message = "You must choose a black piece."
                if (this.props.player === 1) {
                    message = "You must choose a white piece."
                }
                this.setState({status: message});
            }
            else {
                if (is_light_square(i)) {
                    rendered_squares[i].style = {...rendered_squares[i].style, backgroundColor: "RGB(80,220,100)"};
                }
                else {
                    rendered_squares[i].style = {...rendered_squares[i].style, backgroundColor: "RGB(0,150,30)"};
                }
                const moves = squares[i].possible_moves(i, squares, board, white_positions, black_positions);
                for (let i = 0; i < moves.length; i++) {
                    if (is_legal_move(this.props.player, white_positions, black_positions, squares, board, moves[i])) {
                        if (is_light_square(moves[i][1])) {
                            rendered_squares[moves[i][1]].style = {...rendered_squares[moves[i][1]].style, backgroundColor: "RGB(80,220,100)"};
                        }
                        else {
                            rendered_squares[moves[i][1]].style = {...rendered_squares[moves[i][1]].style, backgroundColor: "RGB(0,150,30)"};
                        }
                    }
                }
                this.setState({
                    rendered_squares: rendered_squares,
                    status: "Where do you want to move?",
                    source_selection: i
                });
            }
        }

        else if (this.state.source_selection > -1) {
            const cleared_squares = clear_colors(rendered_squares, this.state.last_move);
            if (squares[i] && squares[i].player === this.props.player) {
                if (this.state.source_selection === i) {
                    this.setState({
                        rendered_squares: cleared_squares,
                        status: "You can not move there.",
                        source_selection: -1,
                    });
                }
                else {
                    if (is_light_square(i)) {
                        rendered_squares[i].style = {...rendered_squares[i].style, backgroundColor: "RGB(80,220,100)"};
                    }
                    else {
                        rendered_squares[i].style = {...rendered_squares[i].style, backgroundColor: "RGB(0,150,30)"};
                    }
                    const moves = squares[i].possible_moves(i, squares, board, white_positions, black_positions);
                    for (let i = 0; i < moves.length; i++) {
                        if (is_legal_move(this.props.player, white_positions, black_positions, squares, board, moves[i])) {
                            if (is_light_square(moves[i][1])) {
                                rendered_squares[moves[i][1]].style = {...rendered_squares[moves[i][1]].style, backgroundColor: "RGB(80,220,100)"};
                            }
                            else {
                                rendered_squares[moves[i][1]].style = {...rendered_squares[moves[i][1]].style, backgroundColor: "RGB(0,150,30)"};
                            }
                        }
                    }
                    this.setState({
                        rendered_squares: rendered_squares,
                        status: "Where do you want to move?",
                        source_selection: i
                    });
                }
            }
            else {
                const move = [this.state.source_selection, i];
                const moves = squares[this.state.source_selection].possible_moves(this.state.source_selection, squares, board, white_positions, black_positions);
                let move_string = JSON.stringify(move);
                let moves_string = JSON.stringify(moves);

                if (moves_string.indexOf(move_string) !== -1 && is_legal_move(this.props.player, white_positions, black_positions, squares, board, move)) {

                    this.add_taken_piece(i);

                    const updated = update_all(white_positions, black_positions, squares, board, move);

                    const updated_rendered_squares = update_rendered_squares(clear_colors(rendered_squares, null), move, this.props.player);

                    const all_squares = this.state.all_squares;
                    all_squares.push(updated_rendered_squares.slice());

                    const all_moves = this.state.all_moves;
                    all_moves.push(move);

                    this.setState({
                        white_positions: updated[0],
                        black_positions: updated[1],
                        squares: updated[2],
                        board: updated[3],
                        all_squares: all_squares,
                        rendered_squares: updated_rendered_squares,
                        current_squares: this.state.current_squares + 1,
                        last_squares: this.state.last_squares + 1,
                        all_moves: all_moves,
                        source_selection: -1,
                        status: "Click anywhere on the board for the opponent to make a move."
                    });
                }
                else {
                    this.setState({
                        rendered_squares: cleared_squares,
                        status: "You can not move there.",
                        source_selection: -1,
                    });
                }
            }
        }
    }

    next_move(white_positions, black_positions, squares, board, rendered_squares) {

        const move = find_next_move(opposite_player(this.props.player), white_positions, black_positions, squares, board, this.props.difficulty);
            this.add_taken_piece(move[1]);
            
            const updated = update_all(white_positions, black_positions, squares, board, move);
            const updated_rendered_squares = update_rendered_squares(clear_colors(rendered_squares, null), move, this.props.player);
            
            const all_squares = this.state.all_squares;
            all_squares.push(updated_rendered_squares.slice());

            const all_moves = this.state.all_moves;
            all_moves.push(move);

            this.setState({
                white_positions: updated[0],
                black_positions: updated[1],
                squares: updated[2],
                board: updated[3],
                rendered_squares: updated_rendered_squares,
                all_squares: all_squares,
                current_squares: this.state.current_squares + 1,
                last_squares: this.state.last_squares + 1,
                last_move: move,
                all_moves: all_moves,
                source_selection: -1,
                status: "It is your turn!"
            });
    }

    game_over(white_positions, black_positions, squares, board) {

        if (white_has_won(white_positions, black_positions, squares, board)) {
            let text;
            if (this.props.player === 1) {
                text = "Well played!";
            }
            else {
                text = "Better luck next time!"
            }
            this.setState({
                winner: "White has won. " + text,
                status: ''
            });
            return true;
        }

        else if (black_has_won(white_positions, black_positions, squares, board)) {
            let text;
            if (this.props.player === 2) {
                text = "Well played!";
            }
            else {
                text = "Better luck next time!"
            }
            this.setState({
                winner: "Black has won." + text,
                status: ''
            });
            return true;
        }

        else if (stalemate(white_positions, black_positions, squares, board)) {
            this.setState({
                winner: "Stalemate!",
                status: ''
            });
            return true;
        }

        return false;
    }

    first_squares() {
        this.setState({
            current_squares: 0,
            rendered_squares: clear_colors(this.state.all_squares[0]),
            white_taken_pieces: [],
            black_taken_pieces: []
        });
    }

    previous_squares() {
        if (this.state.board[1] === this.props.player && this.state.current_squares > 0) {
            const all_taken_pieces = this.state.all_taken_pieces.slice();
            if (this.state.current_squares === 1) {
                this.setState({
                    current_squares: this.state.current_squares-1,
                    rendered_squares: clear_colors(this.state.all_squares[this.state.current_squares-1], this.state.all_moves[this.state.current_squares-2]),
                    white_taken_pieces: [],
                    black_taken_pieces: []
                });
            }
            else {
                this.setState({
                    current_squares: this.state.current_squares-1,
                    rendered_squares: clear_colors(this.state.all_squares[this.state.current_squares-1], this.state.all_moves[this.state.current_squares-2]),
                    white_taken_pieces: all_taken_pieces[2*this.state.current_squares-4],
                    black_taken_pieces: all_taken_pieces[2*this.state.current_squares-3]
                });
            }
        }
    }

    next_squares() {
        if (this.state.board[1] === this.props.player && this.state.current_squares < this.state.last_squares){
            const all_taken_pieces = this.state.all_taken_pieces.slice();
            if (this.state.current_squares < this.state.last_squares) {
                this.setState({
                    current_squares: this.state.current_squares+1,
                    rendered_squares: clear_colors(this.state.all_squares[this.state.current_squares+1], this.state.all_moves[this.state.current_squares]),
                    white_taken_pieces: all_taken_pieces[2*this.state.current_squares],
                    black_taken_pieces: all_taken_pieces[2*this.state.current_squares+1]
                });
            }
        }
    }

    latest_squares() {
        if (this.state.board[1] === this.props.player && this.state.current_squares < this.state.last_squares) {
            const all_taken_pieces = this.state.all_taken_pieces.slice();
            this.setState({
                current_squares: this.state.last_squares,
                rendered_squares: clear_colors(this.state.all_squares[this.state.last_squares], this.state.all_moves[this.state.last_squares-1]),
                white_taken_pieces: all_taken_pieces[2*this.state.last_squares-2],
                black_taken_pieces: all_taken_pieces[2*this.state.last_squares-1]
            });
        }
    }

    add_taken_piece(i) {
        const squares = this.state.squares.slice();
        const white_taken_pieces = this.state.white_taken_pieces.slice();
        const black_taken_pieces = this.state.black_taken_pieces.slice();
        const all_taken_pieces = this.state.all_taken_pieces.slice();
        if (squares[i] != null) {
            if (squares[i].player === this.props.player) {
                white_taken_pieces.push(squares[i]);
            }
            else {
                black_taken_pieces.push(squares[i]);
            }
        }
        all_taken_pieces.push(white_taken_pieces);
        all_taken_pieces.push(black_taken_pieces);
        this.setState({
            white_taken_pieces: white_taken_pieces,
            black_taken_pieces: black_taken_pieces,
            all_taken_pieces: all_taken_pieces
        });
    }

    render() {
        return (
            <div className="game">
                <div className="taken_pieces">
                    <TakenPieces taken_pieces = {this.state.white_taken_pieces} />
                </div>
                <div className="game_board">
                    <div className="game_buttons">
                        <button className="game_button" onClick={(i) => this.first_squares()}>I&lt;</button>
                        <button className="game_button" onClick={(i) => this.previous_squares()}>&lt;</button>
                    </div>
                    <Board
                        squares = {this.state.rendered_squares}
                        onClick = {(i) => this.handle_click(i)}
                    />
                    <div className="game_buttons">
                        <button className="game_button" onClick={(i) => this.next_squares()}>&gt;</button>
                        <button className="game_button" onClick={(i) => this.latest_squares()}>&gt;I</button>
                    </div>
                </div>
                <div className="taken_pieces">
                    <TakenPieces taken_pieces = {this.state.black_taken_pieces} />
                </div>
                <div className="game_status">{this.state.status}{this.state.winner}</div>
            </div>
        );
    }
}