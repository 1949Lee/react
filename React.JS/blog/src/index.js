import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {GlobalStyle} from './style.js';
import App from './App';

ReactDOM.render(<Fragment><App/><GlobalStyle/></Fragment>, document.getElementById('root'));