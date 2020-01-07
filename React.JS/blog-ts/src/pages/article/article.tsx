import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import axios from 'axios';
import {Parse} from "../../components/lee-editor/tokens-parser";
import {ArticleListItem} from '../../utils/api.interface';
import {Tag} from "../../utils/interface";
import * as style from './style.scss'

interface State {
	article: ArticleListItem;
	content: JSX.Element;
}

interface Props extends React.ComponentProps<any>, RouteComponentProps<{ id: any }> {
}

class Article extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			article: null,
			content: null
		};

	}

	componentDidMount(): void {
		axios.post("http://localhost:1314/show-article", {id: +this.props.match.params.id}).then((res) => {
			if (res.data.code === 0 && res.data.data.list) {
				this.setState({content: Parse(res.data.data.list), article: res.data.data.article})
			} else if (res.data.code === 1) {
				this.setState({content: <span className={style['article-not-found']}>内容不存在，点击返回首页</span>})
			} else {
				this.setState({content: <span className={style['error-token']}>加载文章内容失败</span>})
			}
		}, err => {

		});
	}

	render() {
		return (
			<div className={style['article-wrapper']}>
				{this.state.article ?
					<div className={style['article-header']}>
						<h1 className={style['title']}>
							{this.state.article.title}
						</h1>
						<div className={style['category-tags']}>
							<span className={style['category']}>{this.state.article.categoryName}</span>@
							<span className={style['tags']}>{this.state.article.tags.map((t:Tag) => t.name).join(',')}</span>
						</div>
					</div>
					: null}
				{this.state.content}
			</div>
		);
	}
}

export default withRouter(Article);
