import {fromJS} from "immutable";
import { reducer as homeReducer} from '../pages/home/store';
import { reducer as headerReducer} from '../layout/header/store';
import {combineReducers} from "redux-immutable";
import {LoginAction} from "./action-creators";
import * as actionType from "./action-type";

const defaultState = fromJS({
	key:null,
	leeToken:null
});

const GlobalReducer = (state = defaultState, action:LoginAction) => {
	switch (action.type) {
		case actionType.SetLoginInfo:
			return state.set("key",action.key).set("leeToken",action.leeToken);
		default:
			return state;
	}
};


const reducer =  combineReducers({
	home:homeReducer,
	header:headerReducer,
	app:GlobalReducer
});

export default reducer;
