import React, {Component} from 'react';
import {Connect} from "../../utils/decorators";
import * as style from './style.scss'

import {actionCreators} from "./store";

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

interface Props extends React.ComponentProps<any>{
	// 初始化文章列表
	initData:() => void,

	// 文章列表
	articleList: any[]
}

@Connect(mapStateToProps,mapDispatchToProps)
class Home extends Component<Props,State> {

	constructor(props:Props) {
		super(props);
	}

  render() {

  	let {articleList} = this.props;
    return (
      <div className={style['home-wrapper']}>
				<div className={style['article-list']}>
					{articleList.map((article) => {
						return (
							<div className={style['article']} key={article.get('id')}>
								<h2 className={style['article-header']}>{article.get('title')}</h2>
								<div className={style['article-preview']}>{article.get('preview')}</div>
								<div className={style['article-options']}></div>
								<div className={style['article-footer']}></div>
							</div>
						)
					})}
				</div>
				<div className={style['recent-article-list']}>
					<div className={style['recent-article']}>最近更新</div>
				</div>
      </div>
    );
  }

	componentDidMount() {
		this.props.initData();
	}
}

export default Home;
