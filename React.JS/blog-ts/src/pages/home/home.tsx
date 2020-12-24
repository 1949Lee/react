import React, {Component, Fragment} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {ArticleListItem} from "../../utils/api.interface";
import {Connect} from "../../utils/decorators";
import * as style from './style.scss'

import {Tooltip} from 'antd';

import {actionCreators} from "./store";
import {List} from 'immutable';
import Footer from "../../layout/footer/footer";
import ArticleList from "../../components/article-list/article-list";

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

  render() {

  	let {articleList} = this.props;
    return (
    	<Fragment>
				<div className={style['home-wrapper']}>
					<ArticleList className={style['article-list']} articleList={articleList} />
					<div className={style['recent-article-list']}>
						<div className={style['recent-article']}>
							<Tooltip title={"大萨达大"}>
								最近更新
							</Tooltip>
						</div>
					</div>
				</div>
				<Footer />
			</Fragment>
    );
  }

	componentDidMount() {
		this.props.initData();
	}
}

export default withRouter(Home);
