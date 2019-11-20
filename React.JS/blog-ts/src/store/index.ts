import {createStore, compose, applyMiddleware} from 'redux';
import reducer from "./reducer";
import thunk from "redux-thunk";

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
	applyMiddleware(thunk)
));
export default store;
