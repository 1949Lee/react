import React, {Component, Fragment} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {ArticleListItem} from "../../utils/api.interface";
import {Connect} from "../../utils/decorators";
import * as style from './style.scss'
import {List} from 'immutable';


interface State extends React.ComponentState{

}

interface Props extends React.ComponentProps<any>,RouteComponentProps{
	// 类名
	className?: string;

	// 文章列表
	articleList: List<ArticleListItem>
}

class ArticleList extends Component<Props,State> {

	constructor(props:Props) {
		super(props);
	}

	navArticle = (article:any) => {
		this.props.history.push('/article/'+article.get('id'),{...article.toJS()});
	};

  render() {

  	let {articleList} = this.props;
    return (
    	<Fragment>
				<div className={`${style['article-list']} ${this.props.className}`}>
					{articleList.map((article:any) => {
						return (
							<div className={style['article']} key={article.get('id')}>
								<h2 className={style['article-header']}>{article.get('title')}</h2>
								<div className={style['article-category-tags']}>
									分类：{article.get('categoryName')}；
									标签：{article.get('tags').map((t) => {
									return t.get('name');
								}).join('，')}
								</div>
								<div className={style['article-footer']}>
									发表于：{article.get('createTime')}，
									更新于：{article.get('updateTime')}
								</div>
								<div className={style['article-preview']}>{article.get('summary')}</div>
								<div className={style['article-options']}>
									<button className={`lee-btn ${style['btn']}`} onClick={() => {this.navArticle(article)}}>查看</button>
								</div>
							</div>
						)
					})}
				</div>
			</Fragment>
    );
  }
}

export default withRouter<Props,any>(ArticleList);
