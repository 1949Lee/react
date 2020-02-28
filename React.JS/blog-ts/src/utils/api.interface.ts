import {Tag} from "./interface";

// 文章列表接口的文章类型
export interface ArticleListItem {
	id: number,
	categoryID: number,
	title: string,
	authorID: number,
	summary: string,
	content: string,
	createTime: string,
	updateTime: string,
	categoryName: string,
	tags: Tag[] | null
}

// 文章列表接口的请求参数
export interface ArticleListParam {
	// 页大小
	pageSize?:number;

	// 页码从1开始
	pageIndex?:number;

	//类别id
	categoryID?:number;

	// 标签id逗号分割
	tagIDs?:string;

	// 查询关键字
	searchText?:string;
}
