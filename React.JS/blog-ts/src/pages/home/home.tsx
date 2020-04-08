import React, {Component, Fragment} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {ArticleListItem} from "../../utils/api.interface";
import {Connect} from "../../utils/decorators";
import * as style from './style.scss'

import {Tooltip} from 'antd';

import {actionCreators} from "./store";
import {List} from 'immutable';
import Footer from "../../layout/footer/footer";
import Login from "../../components/login/login";

const mapStateToProps = (state:any) => ({
	articleList: state.getIn(['home', 'articleList'])
});

const mapDispatchToProps = (dispatch:any) => ({

	initData() {
		dispatch(actionCreators.initArticleList());
	}
});


interface State extends React.ComponentState{

}

// type abc = typeof {
// 	articleList: 1
// }

interface Props extends React.ComponentProps<any>,RouteComponentProps{
	// 初始化文章列表
	initData:() => void,

	// 文章列表
	articleList: List<ArticleListItem>
}

@Connect(mapStateToProps,mapDispatchToProps)
class Home extends Component<Props,State> {

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
				<div className={style['home-wrapper']}>
					<Login/>
					<div className={style['article-list']}>
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
					<div className={style['recent-article-list']}>
						<div className={style['recent-article']}>
							<Tooltip title={"大萨达大"}>
								最近更新
							</Tooltip>
						</div>
					</div>
				</div>
				<Footer></Footer>
			</Fragment>
    );
  }

	componentDidMount() {
		this.props.initData();
	}
}

export default withRouter(Home);
