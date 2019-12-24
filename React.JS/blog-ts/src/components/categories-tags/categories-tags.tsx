import React, {Component} from 'react';
import {CategoryWithTags, Tags} from "../../utils/interface";
import * as style from "./style.scss";
import {Tag} from 'antd';

const {CheckableTag} = Tag;

interface State {
	categoryID: number
	searchText: string
	chosenTags: Tags[]
}

interface Props extends React.ComponentProps<any> {
	categoryWithTags: CategoryWithTags[],
	// defaultChosen:
}

class CategoriesTags extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			categoryID: 0,
			searchText: '',
			chosenTags: []
		}
	}

	componentDidMount(): void {
	}

	handleCategoryChange = (checked: boolean, c: CategoryWithTags) => {
		if (checked) {
			this.setState({
				categoryID: c.id
			})
		} else {
			this.setState({
				categoryID: null
			})
		}
	};
	handleTagClick = (checked:boolean,t:Tags) => {
		if(checked) {
			this.setState((state) => {
				state.chosenTags.push(t);
				return {chosenTags:[...state.chosenTags]}
			})
		}
		else {
			this.setState((state) => {
				let index = state.chosenTags.indexOf(t);
				state.chosenTags.splice(index,1);
				return {chosenTags:[...state.chosenTags]}
			})
		}
	};

	render() {
		// 选中的分类
		let ctg = this.props.categoryWithTags.find((c) => c.id === this.state.categoryID);
		return (
			<div className={style['categories-tags-wrapper']}>
				<div className={style['categories-wrapper']}>
					{
						this.props.categoryWithTags.map((c: CategoryWithTags, index: number) => {
							return (
								<CheckableTag key={c.id}
															className={`${style['lee-tag']} ${this.state.categoryID === c.id ? `${style['checked']}` : ''}`}
															checked={this.state.categoryID === c.id}
															onChange={checked => {
																this.handleCategoryChange(checked, c)
															}}
								>{c.name}</CheckableTag>)
						})
					}
				</div>
				<div className={style['tags-wrapper']}>
					{
						this.state.categoryID !== null&&ctg&&ctg.tags &&ctg.tags.length>0?ctg.tags
							.filter((t) => !this.state.searchText || t.name.indexOf(this.state.searchText) !== -1)
							.map((t) => {
								return <CheckableTag key={t.id}
																		 className={`${style['lee-tag']} ${this.state.chosenTags.indexOf(t) >= 0 ? `${style['checked']}` : ''}`}
																		 checked={this.state.chosenTags.indexOf(t) >= 0}
																		 onChange={checked => {
																			 this.handleTagClick(checked, t)
																		 }}
								>{t.name}</CheckableTag>
							}) : null
					}
				</div>
			</div>
		);
	}
}

export default CategoriesTags
