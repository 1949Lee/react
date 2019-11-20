import { reducer as homeReducer} from '../pages/home/store';
import {combineReducers} from "redux-immutable";

const reducer =  combineReducers({
	home:homeReducer
});

export default reducer;
