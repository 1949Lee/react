export interface CategoryWithTags {
	id:number;
	name:string;
	tags:Tags[]|null;
	addedTags?:Tags[]
}

export interface Tags {
	id:number,
	name:string,
	categoryID:number
}
