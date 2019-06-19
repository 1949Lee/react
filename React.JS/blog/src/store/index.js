import { createStore, compose } from 'redux';
import reducer from "./reducer";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  // applyMiddleware(...middleware)
));
export default store;