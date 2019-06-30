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
    this.state = {page: 1};
    this.handleSearchOptionsChange = this.handleSearchOptionsChange.bind(this);
  }

  getSearchOptions() {
    let {searchBarFocused, searchOptionsActive, searchOptionsTag, handleSearchOptionsLeave, handleSearchOptionsEnter} = this.props;
    let {page} = this.state;
    const tags = searchOptionsTag.toJS().slice((page -1) * 10, (page -1) * 10 + 9);
    if (searchBarFocused || searchOptionsActive) {
      return (
        <SearchOptions onMouseEnter={handleSearchOptionsEnter} onMouseLeave={handleSearchOptionsLeave}>
          <SearchOptionsTitle>
            热门搜索
            <SearchOptionsChange onClick={this.handleSearchOptionsChange}>
              换一批
            </SearchOptionsChange>
          </SearchOptionsTitle>
          <SearchOptionsTagList>
            {
              tags.map((tag) => {
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

  handleSearchOptionsChange() {
    if(this.state.page * 10 > this.props.searchOptionsTag.size) {
      this.setState({page: 1});
      return;
    }
    this.setState({page: this.state.page + 1});
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
    searchOptionsActive: state.getIn(['header', 'searchOptionsActive']),
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
    },
    handleSearchOptionsEnter() {
      dispatch(actionCreators.searchOptionsEnter());
    },
    handleSearchOptionsLeave() {
      dispatch(actionCreators.searchOptionsLeave());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);