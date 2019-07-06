import React, {Component} from 'react';
import {
  Article,
  ArticleFooter,
  ArticleHeader,
  ArticleList,
  ArticleOptions,
  ArticlePreview,
  HomeWrapper,
  MoreList, RecentArticle
} from "./style";
import {connect} from "react-redux";
import {actionCreators} from "./store";

class Home extends Component {
  render() {
    let {articleList} = this.props;
    return (
      <HomeWrapper>
        <ArticleList>
          {articleList.map((article) => {
            return (
              <Article key={article.get('id')}>
                <ArticleHeader>{article.get('title')}</ArticleHeader>
                <ArticlePreview>{article.get('preview')}</ArticlePreview>
                <ArticleOptions></ArticleOptions>
                <ArticleFooter></ArticleFooter>
              </Article>
            )
          })}
        </ArticleList>
        <MoreList>
          <RecentArticle>最近更新</RecentArticle>
        </MoreList>
      </HomeWrapper>
    );
  }

  componentDidMount() {
    this.props.initData();
  }
}

const mapStateToProps = (state) => ({
  articleList: state.getIn(['home', 'articleList'])
});

const mapDispatchToProps = (dispatch) => ({
  initData() {
    dispatch(actionCreators.initArticleList());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
