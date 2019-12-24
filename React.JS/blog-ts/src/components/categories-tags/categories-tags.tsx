import React, {Component} from 'react';
import {CategoryWithTags, Tags} from "../../utils/interface";
import * as style from "./style.scss";
import {Input, Tag} from 'antd';
import axios from 'axios';

const {CheckableTag} = Tag;

interface State {
	// 选择的分类ID
	categoryID: number

	// 标签过滤文案
	searchText: string

	// 已选择的标签
	chosenTags: Tags[],

	// 是否显示新增分类的输入框
	newCategoryInput: boolean

	// 是否显示新增标签的输入框
	newTagInput: boolean

	// 自己新增的标签。用于展示和删除
	addedTags: {[key:string]:Tags[]}

	// 自己新增的标签。用于展示和删除
	addedCategory: CategoryWithTags[]
}

interface Props extends React.ComponentProps<any> {
	categoryWithTags: CategoryWithTags[],
	// defaultChosen:
}

class CategoriesTags extends Component<Props, State> {

	// 新增分类的输入框
	newCategoryInputRef: React.RefObject<HTMLInputElement> = React.createRef();

	// 新增标签的输入框
	newTagInputRef: React.RefObject<HTMLInputElement> = React.createRef();


	constructor(props: Props) {
		super(props);
		this.state = {
			categoryID: 0,
			searchText: '',
			chosenTags: [],
			newCategoryInput: false,
			newTagInput: false,
			addedTags: {},
			addedCategory: []
		}
	}

	componentDidMount(): void {
	}

	// 处理文章分类点击
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

	// 处理文章标签点击
	handleTagClick = (checked: boolean, t: Tags) => {
		if (checked) {
			this.setState((state) => {
				state.chosenTags.push(t);
				return {chosenTags: [...state.chosenTags]}
			})
		} else {
			this.setState((state) => {
				let index = state.chosenTags.indexOf(t);
				state.chosenTags.splice(index, 1);
				return {chosenTags: [...state.chosenTags]}
			})
		}
	};

	// 处理添加新标签点击
	doNewTagClick = () => {
		this.setState({newTagInput: true}, () => {
			this.newTagInputRef.current.focus();
		});
	};

	// 处理添加新分类点击
	doNewCategoryClick = () => {
		this.setState({newCategoryInput: true}, () => {
			this.newCategoryInputRef.current.focus();
		});
	};

	// 处理添加新分类输入时键盘按下
	newCategoryInputKeyDown = (e: React.KeyboardEvent) => {
		// mac中command键+回车键会触发请求；windows中windows键+回车键会触发请求；然后mac和windows中ctrl键+回车都会触发请求
		if ((e.metaKey && e.key.toUpperCase() === 'ENTER') || (e.ctrlKey && e.key.toUpperCase() === 'ENTER')) {
			axios.post('http://localhost:1314/new-category', {
				name: this.newCategoryInputRef.current.value
			}).then((res) => {
				if (res.data.code === 0) {
					this.setState((state) => {
						state.addedCategory.push({
							id: res.data.data.id,
							name: this.newCategoryInputRef.current.value,
							tags: null
						});
						return {addedCategory: state.addedCategory};
					});
				}
			}, err => {
				console.error(err);
			});
		}
	};

	// 处理添加新标签输入时键盘按下
	newTagInputKeyDown = (e: React.KeyboardEvent) => {
		// mac中command键+回车键会触发请求；windows中windows键+回车键会触发请求；然后mac和windows中ctrl键+回车都会触发请求
		if ((e.metaKey && e.key.toUpperCase() === 'ENTER') || (e.ctrlKey && e.key.toUpperCase() === 'ENTER')) {
			axios.post('http://localhost:1314/new-tag', {
				categoryID: this.state.categoryID,
				name: this.newTagInputRef.current.value
			}).then((res) => {
				if (res.data.code === 0) {
					this.setState((state) => {
						if(!state.addedTags[this.state.categoryID]){
							state.addedTags[this.state.categoryID] = [];
						}
						state.addedTags[this.state.categoryID].push({
							id:res.data.data.id,
							name:this.newTagInputRef.current.value,
							categoryID:this.state.categoryID
						});
						return {addedTags:state.addedTags}
					});
				}
			}, err => {
				console.error(err);
			});
		}
	};
	doDeleteAddedTag = (tag:Tags) => {
		axios.post('http://localhost:1314/delete-tag', {
			id: tag.id
		}).then((res) => {
			if (res.data.code === 0) {
				this.setState((state) => {
					let i = state.addedTags[this.state.categoryID].findIndex((t) => t.id === tag.id);
					state.addedTags[this.state.categoryID].splice(i,1);
					return {addedTags:state.addedTags}
				});
			}
		}, err => {
			console.error(err);
		});
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
					<div className={style['new-category']}>
						{
							this.state.newCategoryInput ?
								<input className={`lee-input lee-input-text ${style['input']}`} type="text" placeholder="新分类"
											 ref={this.newCategoryInputRef}
											 onKeyDown={(e) => {
												 this.newCategoryInputKeyDown(e)
											 }}
											 onBlur={() => {
												 this.setState({newCategoryInput: false})
											 }}/> :
								<Tag className={style['lee-tag']} onClick={() => {
									this.doNewCategoryClick()
								}}>
									添加新分类
								</Tag>
						}
					</div>
				</div>
				<div className={style['tags-wrapper']}>
					{
						this.state.categoryID !== null && ctg && ctg.tags && ctg.tags.length > 0 ? ctg.tags
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
					{
						this.state.categoryID !== null && this.state.addedTags[this.state.categoryID] ? this.state.addedTags[this.state.categoryID]
							.filter((t) => !this.state.searchText || t.name.indexOf(this.state.searchText) !== -1)
							.map((t) => {
								return <Tag key={t.id} className={style['lee-tag']}
														closable={true}
														onClose={(e) => {
															this.doDeleteAddedTag(t)
														}}
								>{t.name}</Tag>
							}) : null
					}
					<div className={style['new-tag']}>
						{
							this.state.categoryID !== null && ctg ?
								(this.state.newTagInput ?
									<input className={`lee-input lee-input-text ${style['input']}`} type="text" placeholder="新标签"
												 ref={this.newTagInputRef}
												 onKeyDown={(e) => {
													 this.newTagInputKeyDown(e)
												 }}
												 onBlur={() => {
													 this.setState({newTagInput: false})
												 }}/> :
									<Tag className={style['lee-tag']} onClick={() => {
										this.doNewTagClick()
									}}>
										添加新标签
									</Tag>) :
								null
						}
					</div>
				</div>
			</div>
		);
	}
}

export default CategoriesTags
