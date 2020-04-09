import {createStore, compose, applyMiddleware} from 'redux';
import reducer from "./reducer";
import * as actionCreators from './action-creators';
import * as actionTypes from './action-type';
import thunk from "redux-thunk";

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
	applyMiddleware(thunk)
));
export {actionCreators,actionTypes};
export default store;
