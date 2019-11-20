import {fromJS} from "immutable";
import * as React from "react";
import {InitArticleList, MoreArticleList} from "./action-type";
import axios from 'axios'


export interface HomeAction {
	// Action类型
	type:string,

	// Action的list数据
	list?:any
}

const resetArticleList = (result:any) => {
	return <HomeAction>{
		type:InitArticleList,
		list:fromJS(result)
	}
};
const moreArticleList = (result:any) => {
	return <HomeAction>{
		type:MoreArticleList,
		list:fromJS(result)
	}
};

export const getArticleList = ({type,data}:any) => {
	return (dispatch:React.Dispatch<HomeAction>) => {
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
