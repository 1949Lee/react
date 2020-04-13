import {createStore, compose, applyMiddleware, Store} from 'redux';
import reducer from "./reducer";
import * as actionCreators from './action-creators';
import * as actionTypes from './action-type';
import thunk from "redux-thunk";
import {Map} from "immutable";

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = compose;
const store:Store<Map<string,any>> = createStore(reducer, /* preloadedState, */ composeEnhancers(
	applyMiddleware(thunk)
));
export {actionCreators,actionTypes};
export default store;
