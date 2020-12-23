import {fromJS} from "immutable";
import { reducer as homeReducer} from '../pages/home/store';
import { reducer as headerReducer} from '../layout/header/store';
import { reducer as categoriesReducer} from '../pages/categories/store';
import {combineReducers} from "redux-immutable";
import {LoginAction} from "./action-creators";
import * as actionType from "./action-type";

let token = localStorage.getItem('leeToken');
let key = localStorage.getItem('leeKey');
const defaultState = fromJS({
	key:token?key:null,
	leeToken:token?token:null
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
	categories:categoriesReducer,
	header:headerReducer,
	app:GlobalReducer
});

export default reducer;
