import React, {Component} from 'react';
import {
  Article,
  ArticleFooter,
  ArticleHeader,
  ArticleList,
  ArticleOptions,
  ArticlePreview,
  HomeWrapper,
  MoreList
} from "./style";

class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        <ArticleList>
          <Article>
            <ArticleHeader>如何使用 Hammerspoon 实现剪贴板历史</ArticleHeader>
            <ArticlePreview>写在前面 Hammerspoon 是一款 macOS 下的自动化工具，软件本身几乎没有什么功能。所有的功能都需要以 lua 脚本的形式编写，放置在 ~/.hammerspoon 下。Hammerspoon 会通过 lua 脚本直接调用 macOS 本地提供的 API，从而实…</ArticlePreview>
            <ArticleOptions></ArticleOptions>
            <ArticleFooter></ArticleFooter>
          </Article>
        </ArticleList>
        <MoreList>
          最近更新
        </MoreList>
      </HomeWrapper>
    );
  }
}

export default Home;
