import React, {Component} from 'react';
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

class Header extends Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  getSearchOptions() {
    let {searchBarFocused, searchOptionsTag} = this.props;
    if (searchBarFocused) {
      return (
        <SearchOptions>
          <SearchOptionsTitle>
            热门搜索
            <SearchOptionsChange>
              换一批
            </SearchOptionsChange>
          </SearchOptionsTitle>
          <SearchOptionsTagList>
            {
              searchOptionsTag.map((tag) => {
                return <SearchOptionsTag key={tag}>{tag}</SearchOptionsTag>
              })
            }
          </SearchOptionsTagList>
        </SearchOptions>
      )
    } else {
      return null;
    }
  }

  render() {
    let {searchBarFocused, handleSearchInputFocus, handleSearchInputBlur} = this.props;
    return (
      <nav style={{'width': '100%', position: 'fixed', 'borderBottom': '1px solid #f0f0f0'}}>
        <HeaderWrapper>
          <Logo>镜中之人</Logo>
          <MenuList>
            <MenuWrapper>
              <MenuItem className="active">
                <i className="menu-icon lee-icon-home"/>
                <span className="text">首页</span>
              </MenuItem>
              <MenuItem>目录</MenuItem>
              <SearchWrapper>
                <CSSTransition
                  in={searchBarFocused}
                  timeout={500}
                  classNames="grow-width">
                  <SearchInput
                    className={searchBarFocused ? "focused" : ""}
                    placeholder="搜索"
                    onFocus={handleSearchInputFocus}
                    onBlur={handleSearchInputBlur}>
                  </SearchInput>
                </CSSTransition>
                {this.getSearchOptions()}
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
  }
}

const mapStateToProps = (state) => {
  return {
    searchBarFocused: state.getIn(['header', 'searchBarFocused']),
    searchOptionsTag: state.getIn(['header', 'searchOptionsTag'])
    // state.get('header').get('searchBarFocused')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearchInputFocus() {
      dispatch(actionCreators.searchFocused());
      dispatch(actionCreators.getSearchOptionsTag());
    },
    handleSearchInputBlur() {
      dispatch(actionCreators.searchBlur());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);