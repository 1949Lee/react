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

// 文章列表接口的请求参数
export interface ArticleListByIDParam {
	// 页大小
	pageSize?:number;

	// 页码从1开始
	pageIndex?:number;

	//类别id
	categoryID:number;

	// 文章id字符串，逗号分割
	articleIDs:string;

}

// 文章所有的分类
export interface CategoryListItem {

	// 分类id
	id: number,

	// 分类名称
	name: string,

	// 分类下的标签数组
	tags: TagListItem[]
}

// 目录页的tag项
export interface TagListItem extends Tag{
	// 该标签所含的文章id数组
	article_ids: number[]

	// 是否被选中
	chosen:boolean
}
