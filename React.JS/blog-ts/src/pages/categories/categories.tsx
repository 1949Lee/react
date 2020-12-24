import React, {Component, Fragment} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {ArticleListItem, CategoryListItem, TagListItem} from "../../utils/api.interface";
import {Connect} from "../../utils/decorators";
import * as style from './style.scss'

import {actionCreators} from "./store";
import {List,Map} from 'immutable';
import {Badge, Button, Input, Radio, Tag} from 'antd';
import ArticleList from "../../components/article-list/article-list";
import {Routes} from "../../router";
import {Keeper} from "../../utils/methods";

const { CheckableTag } = Tag;

const mapStateToProps = (state:any) => ({
	categoryList: state.getIn(['categories', 'categoryList']),
	articleList: state.getIn(['categories', 'articleList'])
});

const mapDispatchToProps = (dispatch:any) => ({

	initData() {
		return dispatch(actionCreators.initTagWithArticleID());
	},
	refreshArticleList(categoryID:number,articleIDs :string = "") {
		dispatch(actionCreators.initArticleList({categoryID:categoryID,articleIDs:articleIDs}));
	}
});


interface State extends React.ComponentState{
	// 选中的文章分类
	activeCategory: number;

	// 选中的tag的id
	chosenTags:number[];

	// tag的搜索文字
	tagTextFilter:string;
}

// type abc = typeof {
// 	articleList: 1
// }

interface Props extends React.ComponentProps<any>,RouteComponentProps{
	// 获取最新分类及标签
	initData:() => void,

	// 根据文章ID获取文章列表
	refreshArticleList:(categoryID:number,articleIDs ?:string) => void

	// 标签列表
	categoryList: List<CategoryListItem>

	// 文章列表
	articleList: List<ArticleListItem>
}

@Connect(mapStateToProps,mapDispatchToProps)
class Categories extends Component<Props,State> {

	constructor(props:Props) {
		super(props);
		let tem = Keeper('category-state').get()
		if(tem) {
			this.state = tem;
		} else {
			this.state = {
				activeCategory:1,
				chosenTags:[],
				tagTextFilter:''
			}
		}

	}

	// 导航到展示文章页面
	navArticle = (article:any) => {
		this.props.history.push('/article/'+article.get('id'),{...article.toJS()});
	};

	// 切换文章分类
	changeActiveCategory = (e) => {
		this.setState({activeCategory:e.target.value,chosenTags:[]},() => {
			this.props.refreshArticleList(this.state.activeCategory);
		})
	};

	// 搜索文案显示
	handleTagTextFilterChange = (e) => {
		this.setState({
			tagTextFilter:e.target.value.toLowerCase()
		})
	};

	// tag点击切换状态
	handleTagClick = (checked:boolean,t:any) => {
		// this.props.changeTagStatus(t,checked)
		console.log(checked,t.get('name'))
		if(checked) {
			this.setState((state) => {
				state.chosenTags.push(t.get('id'))
				return {
					chosenTags:state.chosenTags
				}
			})
		} else {
			this.setState((state) => {
				state.chosenTags.splice(state.chosenTags.findIndex((_) => _ === t.get('id')),1)
				return {
					chosenTags:state.chosenTags
				}
			})
		}
	};

	// 点击查询文章，根据文章ID获取文章列表
	getArticleList = (chosen: any[]) => {
		if(chosen&&chosen.length > 0) {
			this.props.refreshArticleList(this.state.activeCategory,Array.prototype.concat.apply([],chosen.map((t) => t.get('article_ids')?t.get('article_ids').toArray():[])).join(','));
		} else {
			this.props.refreshArticleList(this.state.activeCategory);
		}
	}

  render() {

  	let {categoryList} = this.props;
  	let {activeCategory,tagTextFilter} = this.state;
  	let temCategories:any = categoryList.find((cate:any) => { return cate.get('id') === activeCategory});
  	let temTags:any = temCategories&&temCategories.get('tags') || null;
  	let chosen:any = []
  	let unChosen:any = []
  	if(temTags&&temTags.size > 0) {
			temTags.map((t:any) => {
				if(this.state.chosenTags.findIndex((chosen) => chosen === t.get('id')) >= 0) {
					chosen.push(t)
				} else {
					unChosen.push(t)
				}
			})
		}
    return (
    	<Fragment>
				<div className={style['categories-wrapper']}>
					<Radio.Group className={style['category-wrapper']} onChange={this.changeActiveCategory} value={activeCategory}>
						{
							categoryList.map((category:any) => {
								return <Radio.Button key={category.get('id')} value={category.get('id')}>{category.get('name')}</Radio.Button>
							})
						}
					</Radio.Group>
					<div className={style['filter-wrapper']}>
						{temTags&&temTags.size > 0?
							<div className={style['chosen-tags-wrapper']}>
								<span>已选择：</span>
								{
									chosen&&chosen.length > 0 ?
										chosen.map((t:any) => {
											return <CheckableTag className={style['tag']}
																					 key={t.get('id')}
																					 checked={true}
																					 onChange={checked => {
																						 this.handleTagClick(checked, t)
																					 }}
											>{t.get('name')}<span className={style['count']}>({t.get('article_ids')?t.get('article_ids').size:0})</span></CheckableTag>
										}):'未选择任何标签'
								}
							</div> :
							null
						}
						<div className={style['options-wrapper']}>
							<Input className={style['tag-text-input']} allowClear={true} placeholder="找不到想要选的标签？输入来筛选" value={this.state.tagTextFilter} onChange={this.handleTagTextFilterChange} />
							<Button className={style['options-button']} type="primary" onClick={() => {this.getArticleList(chosen)}}>查看文章</Button>
						</div>
						<div className={style['tags-wrapper']}>
							{
								unChosen&&unChosen.length > 0 ?
									unChosen.map((t:any) => {
										if(t.get('name').toLowerCase().indexOf(tagTextFilter) >= 0) {
											return <CheckableTag className={style['tag']}
																					 key={t.get('id')}
																					 checked={false}
																					 onChange={checked => {
																						 this.handleTagClick(checked, t)
																					 }}
											>{t.get('name')}<span className={style['count']}>({t.get('article_ids')?t.get('article_ids').size:0})</span></CheckableTag>
										} else {
											return null
										}
									}):'该分类下暂无标签'
							}
						</div>
					</div>
					<ArticleList articleList={this.props.articleList}/>
				</div>
			</Fragment>
    );
  }

	componentDidMount() {
		this.props.initData();
	}

	componentWillUnmount() {
		if(!Keeper('category-state').set(Routes.article,this.props.history.location,this.state)) {

		}
		// if (Routes.article.regexp.test(this.props.history.location.pathname)) {
		// 	sessionStorage.setItem('category-state',JSON.stringify(this.state))
		// } else {
		// 	sessionStorage.removeItem('category-state')
		// }
	}
}

export default withRouter(Categories);
