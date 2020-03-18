import React from 'react';
import ReactDOM from 'react-dom';
import './chess/chess_index.css';
import P_V_P from "./chess/components/P_V_P";
import P_V_AI from "./chess/components/P_V_AI";
import App from './components/App';

ReactDOM.render(<P_V_AI />, document.getElementById('root'));

