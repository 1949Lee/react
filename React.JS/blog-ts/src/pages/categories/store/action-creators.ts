import * as React from "react";
import {GetURL} from "../../../api";
import {
	ArticleListByIDParam,
	ArticleListItem,
	ArticleListParam,
	CategoryListItem,
	TagListItem
} from "../../../utils/api.interface";
import { InitArticleList, InitTags, MoreArticleList} from "./action-type";
import axios from 'axios'

export interface CategoriesAction {
	// Action类型
	type: string

	// Action的list数据
	articleList?: ArticleListItem[]

	// 标签列表
	categoryList?: CategoryListItem[]

	// Action的list是否为最后一页
	isLastPage?: boolean
}

const resetArticleList = (result: any) => {
	return <CategoriesAction>{
		type: InitArticleList,
		articleList: result.list,
		isLastPage: result.isLastPage,
	}
};
const moreArticleList = (result: any) => {
	return <CategoriesAction>{
		type: MoreArticleList,
		articleList: result.list,
		isLastPage: result.isLastPage
	}
};

const initTags = (result: any) => {
	return <CategoriesAction>{
		type: InitTags,
		categoryList: result.list
	}
}

export const getArticleList = ({type, data}: { type: string, data: ArticleListByIDParam }) => {
	return (dispatch: React.Dispatch<CategoriesAction>) => {
		if (type === 'init') {
			data.pageIndex = 1;
			data.pageSize = 200;
			return new Promise((resolve, reject) => {
				axios.post(GetURL('/article-list-by-ids'), data).then((r) => {
					let res = r.data;
					dispatch(resetArticleList(res.data));
					resolve(res.data);
				}, err => {
					dispatch(resetArticleList({list: [], isLastPage: false}))
					reject(false);
				})
			});
		} else {
			axios.post(GetURL('/article-list-by-ids'), data).then((r) => {
				let res = r.data;
				dispatch(moreArticleList(res.data));
			}, err => {
				dispatch(moreArticleList({list: [], isLastPage: false}))
			});
		}
	}
};


// 获取最新分类及标签
export const getTagsWithArticleID = () => {
	return (dispatch: React.Dispatch<CategoriesAction>) => {
		return new Promise((resolve, reject) => {
			axios.post(GetURL('/tags-with-article-id')).then((r) => {
				let res = r.data;
				dispatch(initTags(res.data));
				resolve(res.data);
			}, err => {
				dispatch(initTags({list: []}))
				reject(false);
			})
		});
	}
};

// 获取文章列表
export const initArticleList = (data: ArticleListByIDParam) => {
	return getArticleList({type: 'init', data});
}

// 获取最新分类及标签
export const initTagWithArticleID = () => {
	return getTagsWithArticleID();
}
