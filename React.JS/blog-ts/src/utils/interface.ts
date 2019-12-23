export interface CategoryWithTags {
	id:number;
	name:string;
	tags:Tags[]|null
}

export interface Tags {
	id:number,
	name:string,
	categoryID:number
}