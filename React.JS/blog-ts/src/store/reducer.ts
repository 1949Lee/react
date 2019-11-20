import { reducer as homeReducer} from '../pages/home/store';
import { reducer as headerReducer} from '../layout/header/store';
import {combineReducers} from "redux-immutable";

const reducer =  combineReducers({
	home:homeReducer,
	header:headerReducer
});

export default reducer;
