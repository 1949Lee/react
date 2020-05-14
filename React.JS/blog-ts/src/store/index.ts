import {createStore, compose, applyMiddleware, Store} from 'redux';
import reducer from "./reducer";
import * as actionCreators from './action-creators';
import * as actionTypes from './action-type';
import thunk from "redux-thunk";
import {Map} from "immutable";

// const composeEnhancers = compose;
let store: Store<Map<string, any>>;
if (process.env.NODE_ENV === 'production') {
	store = createStore(reducer, /* preloadedState, */ compose<any>(
		applyMiddleware(thunk)
	));
} else {
	// @ts-ignore
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	store = createStore(reducer, /* preloadedState, */ composeEnhancers(
		applyMiddleware(thunk)
	));
}
export {actionCreators, actionTypes};
export default store;
