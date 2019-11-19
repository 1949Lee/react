import React, {Component} from 'react';
import {Connect} from "../../utils/decorators";

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

interface Props extends React.ComponentProps<any>{
	// 初始化文章列表
	initData:() => void,

	// 文章列表
	articleList: any[]
}

@Connect(mapStateToProps,mapDispatchToProps)
class Home extends Component<Props,State> {
  render() {
    return (
      <div>
				{this.props.articleList.map((article) => {
					return (
						<div key={article.get('id')}>
							<span>{article.get('title')}</span>
							<span>{article.get('preview')}</span>
						</div>
					)
				})}
      </div>
    );
  }

	componentDidMount() {
		this.props.initData();
	}
}

export default Home;
