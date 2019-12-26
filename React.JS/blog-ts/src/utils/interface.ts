export interface CategoryWithTags {
	id:number;
	name:string;
	tags:Tags[]|null;
}

export interface Tags {
	id:number,
	name:string,
	categoryID:number
}

export interface ArticleInfo {
	articleID:number
	title?:string;
	createTime?:string;
	updateTime?:string;
	category?:{
		id:number;
		name:string;
	};
	tags?:{
		id:number,
		name:string,
		categoryID:number
	}[]
}


// editor的markdown的内容修改或者添加文件后发射的数据
export interface EditorData {

	// 文章ID
	articleID?:number

	// 1表示数据类型为markdown内容修改。2表示数据类型为添加文件
	type:number;

	// markdown内容
	text?:string;

	// 添加的文件信息（数据需要单独接受）
	files?:FileList
}
