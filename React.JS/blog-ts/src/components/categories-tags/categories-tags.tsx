import React, {Component} from 'react';
import {GetURL} from "../../api";
import {CategoryWithTags, Tag as T} from "../../utils/interface";
import * as style from "./style.scss";
import { message, Tag} from 'antd';
import axios from 'axios';

const {CheckableTag} = Tag;

interface State {
	// 选择的分类ID
	categoryID: number

	// 标签过滤文案
	searchText: string

	// 已选择的标签
	chosenTags: T[],

	// 是否显示新增分类的输入框
	newCategoryInput: boolean

	// 是否显示新增标签的输入框
	newTagInput: boolean

	// 自己新增的标签。用于展示和删除
	addedTags: {[key:string]:T[]}

	// 自己新增的标签。用于展示和删除
	addedCategory: CategoryWithTags[]
}

interface Props extends React.ComponentProps<any> {
	categoryWithTags: CategoryWithTags[];
	defaultChosen:{categoryID:number,tags:T[]}
}

class CategoriesTags extends Component<Props, State> {

	// 新增分类的输入框
	newCategoryInputRef: React.RefObject<HTMLInputElement> = React.createRef();

	// 新增标签的输入框
	newTagInputRef: React.RefObject<HTMLInputElement> = React.createRef();


	constructor(props: Props) {
		super(props);
		if(this.props.defaultChosen) {
			this.state = {
				categoryID: this.props.defaultChosen.categoryID,
				searchText: '',
				chosenTags: this.props.defaultChosen.tags,
				newCategoryInput: false,
				newTagInput: false,
				addedTags: {},
				addedCategory: []
			}
		} else {
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
	}

	componentDidMount(): void {
	}

	// 处理文章分类点击
	handleCategoryChange = (checked: boolean, c: CategoryWithTags) => {
		if (checked) {
			this.setState({
				categoryID: c.id,
				chosenTags:[],
			})
		} else {
			this.setState({
				categoryID: null,
				chosenTags:[],
			})
		}
	};

	// 处理文章标签点击
	handleTagClick = (checked: boolean, t: T) => {
		if (checked) {
			this.setState((state) => {
				state.chosenTags.push(t);
				return {chosenTags: [...state.chosenTags]}
			})
		} else {
			this.setState((state) => {
				let index = state.chosenTags.findIndex((chosen) => chosen.id === t.id);
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
			const hide = message.loading('添加中..', 0);
			axios.post(GetURL('/new-category'), {
				name: this.newCategoryInputRef.current.value
			}).then((res) => {
				hide();
				if (res.data.code === 0) {
					this.setState((state) => {
						state.addedCategory.push({
							id: res.data.data.id,
							name: this.newCategoryInputRef.current.value,
							tags: null
						});
						return {addedCategory: state.addedCategory,categoryID:res.data.data.id};
					},()=>{this.newCategoryInputRef.current.blur();});
				}
			}, err => {
				hide();
				console.error(err);
			});
		}
	};

	// 处理添加新标签输入时键盘按下
	newTagInputKeyDown = (e: React.KeyboardEvent) => {
		// mac中command键+回车键会触发请求；windows中windows键+回车键会触发请求；然后mac和windows中ctrl键+回车都会触发请求
		if ((e.metaKey && e.key.toUpperCase() === 'ENTER') || (e.ctrlKey && e.key.toUpperCase() === 'ENTER')) {
			const hide = message.loading('添加中..', 0);
			axios.post(GetURL('/new-tag'), {
				categoryID: this.state.categoryID,
				name: this.newTagInputRef.current.value
			}).then((res) => {
				hide();
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
					},()=>{this.newTagInputRef.current.blur();});
				}
			}, err => {
				console.error(err);
				hide();
			});
		}
	};

	// 删除自定义添加的标签
	doDeleteAddedTag = (tag:T) => {
		const hide = message.loading('删除中..', 0);
		axios.post(GetURL('/delete-tag'), {
			id: tag.id
		}).then((res) => {
			hide();
			if (res.data.code === 0) {
				this.setState((state) => {
					let i = state.addedTags[this.state.categoryID].findIndex((t) => t.id === tag.id);
					state.addedTags[this.state.categoryID].splice(i,1);
					return {addedTags:state.addedTags}
				});
			}
		}, err => {
			hide();
			console.error(err);
		});
	};

	// 删除自定义添加的分类
	doDeleteAddedCategory = (ctg:CategoryWithTags) => {
		const hide = message.loading('删除中..', 0);
		axios.post(GetURL('/delete-category'), {
			id: ctg.id
		}).then((res) => {
			hide();
			if (res.data.code === 0) {
				this.setState((state) => {
					let i = state.addedCategory.findIndex((t) => t.id === ctg.id);
					state.addedCategory.splice(i,1);
					return {addedCategory:state.addedCategory}
				});
			}
		}, err => {
			hide();
			console.error(err);
		});
	};

	render() {
		// 选中的分类
		let ctg = this.props.categoryWithTags.find((c) => c.id === this.state.categoryID) || this.state.addedCategory.find((c) => c.id === this.state.categoryID);
		return (
			<div className={style['categories-tags-wrapper']}>
				<div className={style['categories-wrapper']}>
					{
						this.props.categoryWithTags.map((c: CategoryWithTags) => {
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
					{
						this.state.addedCategory.map((c: CategoryWithTags) => {
							return (
								<CheckableTag key={c.id}
															className={`${style['lee-tag']} ${this.state.categoryID === c.id ? `${style['checked']}` : ''}`}
															checked={this.state.categoryID === c.id}
															onChange={checked => {
																this.handleCategoryChange(checked, c)
															}}
								>
									<span>{c.name}</span>
									<i className={`${style['close-icon']} lee-icon-cross`}
										 onClick={() => {
											 this.doDeleteAddedCategory(c)
										 }}
									/>
								</CheckableTag>)
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
																		 className={`${style['lee-tag']} ${this.state.chosenTags.findIndex((chosen) => chosen.id === t.id) >= 0 ? `${style['checked']}` : ''}`}
																		 checked={this.state.chosenTags.findIndex((chosen) => chosen.id === t.id) >= 0}
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
								return <CheckableTag key={t.id}
																		 className={`${style['lee-tag']} ${this.state.chosenTags.findIndex((chosen) => chosen.id === t.id) >= 0 ? `${style['checked']}` : ''}`}
																		 checked={this.state.chosenTags.findIndex((chosen) => chosen.id === t.id) >= 0}
																		 onChange={checked => {
																			 this.handleTagClick(checked, t)
																		 }}
								>
									<span>{t.name}</span>
									<i className={`${style['close-icon']} lee-icon-cross`}
										 onClick={() => {
											 this.doDeleteAddedTag(t)
										 }}
									/>
								</CheckableTag>
							}) : null
					}
					<div className={style['new-tag']}>
						{
							this.state.categoryID !== null && ctg?
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
