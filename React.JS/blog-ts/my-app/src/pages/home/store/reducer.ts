import {fromJS} from 'immutable'
import * as actionType from "./action-type";

const defaultState = fromJS({
	articleList:[]
});

const reducer = (state = defaultState, action:any) => {
	console.log(action);
	switch (action.type) {
		case actionType.MoreArticleList:
			return state.set('articleList',action.list);
		case actionType.InitArticleList:
			return state.set('articleList',state.get('articleList').concat(action.list));
		default:
			return state;
	}
};


export default reducer;
