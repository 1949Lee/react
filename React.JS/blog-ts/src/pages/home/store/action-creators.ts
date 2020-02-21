import {fromJS} from "immutable";
import * as React from "react";
import {GetURL} from "../../../api";
import {ArticleListItem} from "../../../utils/api.interface";
import {InitArticleList, MoreArticleList} from "./action-type";
import axios from 'axios'


export interface HomeAction {
	// Action类型
	type:string,

	// Action的list数据
	list?:ArticleListItem[]

	// Action的list是否为最后一页
	isLastPage?:boolean
}

const resetArticleList = (result:any) => {
	return <HomeAction>{
		type:InitArticleList,
		list:fromJS(result.list),
		isLastPage:result.isLastPage,
	}
};
const moreArticleList = (result:any) => {
	return <HomeAction>{
		type:MoreArticleList,
		list:fromJS(result.data),
		isLastPage:result.isLastPage
	}
};

export const getArticleList = ({type,data}:any) => {
	return (dispatch:React.Dispatch<HomeAction>) => {
		if(type === 'init') {
			axios.post(GetURL('/article-list'),{}).then((r) => {
				let res = r.data;
				dispatch(resetArticleList(res.data));
			},err => {
				dispatch(resetArticleList({list:[],isLastPage:false}))
			});
		} else {
			axios.get(GetURL('/article-list')).then((r) => {
				let res = r.data;
				dispatch(moreArticleList(res.data));
			},err => {
				dispatch(moreArticleList({list:[],isLastPage:false}))
			});
		}
	}
};

export const initArticleList = () => {
	return getArticleList({type:'init'});
}
