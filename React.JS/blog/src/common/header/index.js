import React from 'react';
import {
  ButtonGroup,
  HeaderOptions,
  HeaderWrapper,
  Logo,
  MenuItem,
  MenuList,
  MenuWrapper,
  SearchInput,
  SearchWrapper
} from "./style";
import {CSSTransition} from 'react-transition-group';
import {connect} from "react-redux";

const Header = (props) => {
  return (
    <nav style={{'width': '100%', position: 'fixed', 'borderBottom': '1px solid #f0f0f0'}}>
      <HeaderWrapper>
        <Logo>镜中之人</Logo>
        <MenuList>
          <MenuWrapper>
            <MenuItem className="active">
              <i className="lee-icon-home"></i>
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
                  placeholder="输入关键字查询"
                  onFocus={props.handleSearchInputFocus}
                  onBlur={props.handleSearchInputBlur}>
                </SearchInput>
              </CSSTransition>
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
    searchBarFocused: state.headerSearchBarFocused
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearchInputFocus() {
      let action = {type:'header_search_focused'};
      dispatch(action);
    },
    handleSearchInputBlur() {
      let action = {type:'header_search_blur'};
      dispatch(action);
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);