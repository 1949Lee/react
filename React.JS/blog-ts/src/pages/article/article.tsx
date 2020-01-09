import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import axios from 'axios';
import LeeArticle from "../../components/lee-article/lee-article";
import {ArticleListItem} from '../../utils/api.interface';
import {Tag, Token} from "../../utils/interface";
import * as style from './style.scss'

interface State {
	article: ArticleListItem;
	content: Token[][];
	result: JSX.Element;
}

interface Props extends React.ComponentProps<any>, RouteComponentProps<{ id: any }> {
}

class Article extends Component<Props, State> {
	text:string = null;
	constructor(props: Props) {
		super(props);
		this.state = {
			article: null,
			content: null,
			result: null,
		};

	}

	componentDidMount(): void {
		axios.post("http://localhost:1314/show-article", {id: +this.props.match.params.id}).then((res) => {
			if (res.data.code === 0 && res.data.data.list) {
				this.text = res.data.data.text;
				this.setState({content: res.data.data.list, article: res.data.data.article})
			} else if (res.data.code === 1) {
				this.setState({result: <span className={style['article-not-found']}>内容不存在，点击返回首页</span>})
			} else {
				this.setState({result: <span className={style['error-token']}>加载文章内容失败</span>})
			}
		}, err => {

		});
	}

	goUpdate = () => {
		this.props.history.push('/update-article/'+(+this.props.match.params.id),{article:this.state.article,text:this.text});
	};

	render() {
		return (
			<div className={style['article-wrapper']}>
				<div className={style['edit-btn']} onClick={this.goUpdate}>编辑</div>
				{this.state.article ?
					<div className={style['article-header']}>
						<h1 className={style['title']}>
							{this.state.article.title}
						</h1>
						<div className={style['category-tags']}>
							（<span className={style['tags']}>{this.state.article.tags.map((t: Tag) => t.name).join(',')}</span>）@
							<span className={style['category']}>{this.state.article.categoryName}</span>
						</div>
					</div>
					: null}
				{
					this.state.result ?
						this.state.result :
						<LeeArticle content={this.state.content}></LeeArticle>
				}
			</div>
		);
	}
}

export default withRouter(Article);
