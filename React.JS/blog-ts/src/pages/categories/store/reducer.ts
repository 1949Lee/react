import {fromJS} from 'immutable'
import {CategoriesAction} from "./action-creators";
import * as actionType from "./action-type";
import {EmptyArticleList} from "./action-type";

const defaultState = fromJS({
	articleList:[],
	categoryList:[]
});

const reducer = (state = defaultState, action:CategoriesAction) => {
	switch (action.type) {
		case actionType.MoreArticleList:
			return state.set('articleList',state.get('articleList').concat(fromJS(action.articleList)));
		case actionType.InitArticleList:
			return state.set('articleList',fromJS(action.articleList));
		case actionType.InitTags:
			return state.set('categoryList',fromJS(action.categoryList));
		case actionType.EmptyArticleList:
			return state.set('articleList',fromJS([]));
		default:
			return state;
	}
};


export default reducer;
