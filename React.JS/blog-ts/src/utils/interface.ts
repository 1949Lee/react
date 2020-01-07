export interface CategoryWithTags {
	id: number;
	name: string;
	tags: Tag[] | null;
}

export interface Tag {
	id: number,
	name: string,
	categoryID: number
}

export interface ArticleInfo {
	articleID: number
	title?: string;
	createTime?: string;
	updateTime?: string;
	category?: {
		id: number;
		name: string;
	};
	tags?: Tag[]
}


// editor的markdown的内容修改或者添加文件后发射的数据
export interface EditorData {

	// 文章ID
	articleID?: number

	// 1表示数据类型为markdown内容修改。2表示数据类型为添加文件
	type: number;

	// markdown内容
	text?: string;

	// 添加的文件信息（数据需要单独接受）
	files?: FileList
}

// markdown节点
export interface Token {

	// 节点的内的文字
	text: string;

	// 节点类型（markdown的节点，如有序列表，无序列表，文本节点，图片块等）
	tokenType: string;

	// 节点对应HTML标签
	tagName: string;

	// 节点CSS样式类名
	class: string;

	// 节点属性
	attrs: NodeAttr[];

	// 子节点
	children: Token[];
}

// markdown节点属性
export interface NodeAttr {
	// 属性名
	key: string;

	// 属性值
	value: string;
}

// 图片查看器的图片项
export interface ImagerItem {

	// 图片的URL链接
	src:string;

	text:JSX.Element
}
