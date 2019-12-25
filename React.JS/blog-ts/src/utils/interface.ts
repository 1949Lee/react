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
