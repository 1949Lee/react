import React, {Component} from 'react';
import {Article, ArticleFooter, ArticleHeader, ArticleList, ArticleOptions, ArticlePreview, HomeWrapper} from "./style";

class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        <ArticleList>
          <Article>
            <ArticleHeader></ArticleHeader>
            <ArticlePreview></ArticlePreview>
            <ArticleOptions></ArticleOptions>
            <ArticleFooter></ArticleFooter>
          </Article>
        </ArticleList>
      </HomeWrapper>
    );
  }
}

export default Home;
