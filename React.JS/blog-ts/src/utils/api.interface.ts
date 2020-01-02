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
	tags: [] | null
}
