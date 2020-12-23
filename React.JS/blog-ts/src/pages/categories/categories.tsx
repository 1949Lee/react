import React, {Component, Fragment} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {ArticleListItem, CategoryListItem, TagListItem} from "../../utils/api.interface";
import {Connect} from "../../utils/decorators";
import * as style from './style.scss'

import {actionCreators} from "./store";
import {List,Map} from 'immutable';
import {Badge, Input, Radio, Tag} from 'antd';

const { CheckableTag } = Tag;

const mapStateToProps = (state:any) => ({
	categoryList: state.getIn(['categories', 'categoryList'])
});

const mapDispatchToProps = (dispatch:any) => ({

	initData() {
		return dispatch(actionCreators.initTagWithArticleID());
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

	// 标签列表
	categoryList: List<CategoryListItem>
}

@Connect(mapStateToProps,mapDispatchToProps)
class Categories extends Component<Props,State> {

	constructor(props:Props) {
		super(props);
		this.state = {
			activeCategory:1,
			chosenTags:[],
			tagTextFilter:''
		}
	}

	// 导航到展示文章页面
	navArticle = (article:any) => {
		this.props.history.push('/article/'+article.get('id'),{...article.toJS()});
	};

	// 切换文章分类
	changeActiveCategory = (e) => {
		this.setState({activeCategory:e.target.value})
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
					{/*<Badge key={category.get('id')} offset={[0, 0]} count={999} overflowCount={999} title={category.get('tags')?`${category.get('name')}分类里共有${category.get('tags').size}个标签`:'该分类下没有标签'}>*/}
					{/*	<span>{category.get('name')}</span>*/}
					{/*</Badge>*/}
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
											>{t.get('name')}</CheckableTag>
										}):null
								}
								<Input className={style['tag-text-input']} allowClear={true} placeholder="找不到？输入搜索" value={this.state.tagTextFilter} onChange={this.handleTagTextFilterChange} />
							</div> :
							null
						}
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
											>{t.get('name')}</CheckableTag>
										} else {
											return null
										}
									}):'该分类下暂无标签'
							}
						</div>
					</div>
				{/*	<div className={style['article-list']}>*/}
				{/*		{articleList.map((article:any) => {*/}
				{/*			return (*/}
				{/*				<div className={style['article']} key={article.get('id')}>*/}
				{/*					<h2 className={style['article-header']}>{article.get('title')}</h2>*/}
				{/*					<div className={style['article-category-tags']}>*/}
				{/*						分类：{article.get('categoryName')}；*/}
				{/*						标签：{article.get('tags').map((t) => {*/}
				{/*						return t.get('name');*/}
				{/*					}).join('，')}*/}
				{/*					</div>*/}
				{/*					<div className={style['article-footer']}>*/}
				{/*						发表于：{article.get('createTime')}，*/}
				{/*						更新于：{article.get('updateTime')}*/}
				{/*					</div>*/}
				{/*					<div className={style['article-preview']}>{article.get('summary')}</div>*/}
				{/*					<div className={style['article-options']}>*/}
				{/*						<button className={`lee-btn ${style['btn']}`} onClick={() => {this.navArticle(article)}}>查看</button>*/}
				{/*					</div>*/}
				{/*				</div>*/}
				{/*			)*/}
				{/*		})}*/}
				{/*	</div>*/}
				</div>
			</Fragment>
    );
  }

	componentDidMount() {
		this.props.initData();
	}
}

export default withRouter(Categories);
