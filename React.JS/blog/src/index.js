import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {GlobalStyle} from './style.js';
import './statics/leeIcon/style.css';
import App from './App';
import './theme/default.scss';

ReactDOM.render(<Fragment><App/><GlobalStyle/></Fragment>, document.getElementById('root'));
