import {fromJS} from "immutable";
import * as React from "react";
import {GetURL} from "../../../api";
import {ArticleListItem, ArticleListParam} from "../../../utils/api.interface";
import {InitArticleList, MoreArticleList} from "./action-type";
import axios from 'axios'


export interface HomeAction {
	// Action类型
	type: string,

	// Action的list数据
	list?: ArticleListItem[]

	// Action的list是否为最后一页
	isLastPage?: boolean
}

const resetArticleList = (result: any) => {
	return <HomeAction>{
		type: InitArticleList,
		list: fromJS(result.list),
		isLastPage: result.isLastPage,
	}
};
const moreArticleList = (result: any) => {
	return <HomeAction>{
		type: MoreArticleList,
		list: fromJS(result.data),
		isLastPage: result.isLastPage
	}
};

export const getArticleList = ({type, data}: { type: string, data?: ArticleListParam }) => {
	data = data === undefined ? {} : data;
	return (dispatch: React.Dispatch<HomeAction>) => {
		if (type === 'init') {
			data.pageIndex = 1;
			return new Promise((resolve, reject) => {
				axios.post(GetURL('/article-list'), data).then((r) => {
					let res = r.data;
					dispatch(resetArticleList(res.data));
					resolve(res.data);
				}, err => {
					dispatch(resetArticleList({list: [], isLastPage: false}))
					reject(false);
				})
			});
		} else {
			axios.post(GetURL('/article-list'), data).then((r) => {
				let res = r.data;
				dispatch(moreArticleList(res.data));
			}, err => {
				dispatch(moreArticleList({list: [], isLastPage: false}))
			});
		}
	}
};

export const initArticleList = (data?: ArticleListParam) => {
	return getArticleList({type: 'init', data});
}
