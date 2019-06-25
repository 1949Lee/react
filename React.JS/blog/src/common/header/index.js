import React from 'react';
import {
  ButtonGroup,
  HeaderOptions,
  HeaderWrapper,
  Logo,
  MenuItem,
  MenuList,
  MenuWrapper,
  SearchInput, SearchOptions, SearchOptionsChange, SearchOptionsTag, SearchOptionsTagList, SearchOptionsTitle,
  SearchWrapper
} from "./style";
import {CSSTransition} from 'react-transition-group';
import {connect} from "react-redux";
import {actionCreators} from './store'

const getSearchOptions = (show) => {
  if (show) {
    return (
      <SearchOptions>
        <SearchOptionsTitle>
          热门搜索
          <SearchOptionsChange>
            换一批
          </SearchOptionsChange>
        </SearchOptionsTitle>
        <SearchOptionsTagList>
          <SearchOptionsTag>Go</SearchOptionsTag>
          <SearchOptionsTag>计算机基础</SearchOptionsTag>
          <SearchOptionsTag>Flutter</SearchOptionsTag>
          <SearchOptionsTag>HTTPS</SearchOptionsTag>
          <SearchOptionsTag>MySQL</SearchOptionsTag>
          <SearchOptionsTag>Vue</SearchOptionsTag>
          <SearchOptionsTag>React/RN</SearchOptionsTag>
          <SearchOptionsTag>Angular</SearchOptionsTag>
          <SearchOptionsTag>JS</SearchOptionsTag>
          <SearchOptionsTag>Webpack</SearchOptionsTag>
        </SearchOptionsTagList>
      </SearchOptions>
    )
  } else {
    return null;
  }
};

const Header = (props) => {
  return (
    <nav style={{'width': '100%', position: 'fixed', 'borderBottom': '1px solid #f0f0f0'}}>
      <HeaderWrapper>
        <Logo>镜中之人</Logo>
        <MenuList>
          <MenuWrapper>
            <MenuItem className="active">
              <i className="menu-icon lee-icon-home"></i>
              <span className="text">首页</span>
            </MenuItem>
            <MenuItem>目录</MenuItem>
            <SearchWrapper>
              <CSSTransition
                in={props.searchBarFocused}
                timeout={500}
                classNames="grow-width">
                <SearchInput
                  className={props.searchBarFocused ? "focused" : ""}
                  placeholder="搜索"
                  onFocus={props.handleSearchInputFocus}
                  onBlur={props.handleSearchInputBlur}>
                </SearchInput>
              </CSSTransition>
              {getSearchOptions(props.searchBarFocused)}
            </SearchWrapper>
          </MenuWrapper>
          <MenuWrapper>
            <MenuItem>Aa</MenuItem>
            <MenuItem>关于博主</MenuItem>
          </MenuWrapper>
        </MenuList>
        <HeaderOptions>
          <ButtonGroup>
            <button className="lee-btn" type="button">写文章</button>
            <button className="lee-btn" type="button">我的作品</button>
          </ButtonGroup>
        </HeaderOptions>
      </HeaderWrapper>
    </nav>
  )
};

const mapStateToProps = (state) => {
  return {
    searchBarFocused: state.getIn(['header', 'searchBarFocused'])
    // state.get('header').get('searchBarFocused')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearchInputFocus() {
      dispatch(actionCreators.searchFocused());
    },
    handleSearchInputBlur() {
      dispatch(actionCreators.searchBlur());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);