import {fromJS} from "immutable";
import {InitArticleList, MoreArticleList} from "./action-type";
import axios from 'axios'

const resetArticleList = (result:any) => {
	return {
		type:InitArticleList,
		list:fromJS(result)
	}
};
const moreArticleList = (result:any) => {
	return {
		type:MoreArticleList,
		list:fromJS(result)
	}
};

export const getArticleList = ({type,data}:any) => {
	return (dispatch:any) => {
		if(type === 'init') {
			axios.get('/mock/articleList.json').then((r) => {
				let res = r.data;
				if (res.code === 0) {
					dispatch(resetArticleList(res.data.list));
				} else {
					dispatch(resetArticleList([]));
				}
			});
		} else {
			axios.get('/mock/articleList.json').then((r) => {
				let res = r.data;
				if (res.code === 0) {
					dispatch(moreArticleList(res.data.list));
				} else {
					dispatch(moreArticleList([]));
				}
			});
		}
	}
};

export const initArticleList = () => {
	return getArticleList({type:'init'});
}
