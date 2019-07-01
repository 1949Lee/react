import React, {Component, Fragment} from 'react';
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


  searchOptionsChangeIcon = null;

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {page: 1};
    this.handleSearchOptionsChange = this.handleSearchOptionsChange.bind(this);
  }

  getSearchOptions() {
    let {searchBarFocused, searchOptionsActive, searchOptionsTag, handleSearchOptionsLeave, handleSearchOptionsEnter} = this.props;
    let {page} = this.state;
    const tags = searchOptionsTag.toJS().slice((page - 1) * 10, (page - 1) * 10 + 9);
    if ((searchBarFocused || searchOptionsActive) && searchOptionsTag.size > 0) {
      return (
        <SearchOptions onMouseEnter={handleSearchOptionsEnter} onMouseLeave={handleSearchOptionsLeave}>
          <SearchOptionsTitle>
            热门搜索
            <SearchOptionsChange onClick={this.handleSearchOptionsChange}>
              <i style={{transform: 'rotate(0deg)'}} ref={(icon) => {
                this.searchOptionsChangeIcon = icon
              }} className="icon lee-icon-refresh"/>
              <span className="text">换一批</span>
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
    let origin = this.searchOptionsChangeIcon.style.transform.match(/[0-9]+/)[0];
    this.searchOptionsChangeIcon.style.transform = `rotate(${+origin + 360}deg)`;
    if (this.state.page * 10 > this.props.searchOptionsTag.size) {
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
                  <Fragment>
                    <SearchInput
                      className={searchBarFocused ? "focused" : ""}
                      placeholder="搜索"
                      onFocus={()=>{handleSearchInputFocus(this.props.searchOptionsTag)}}
                      onBlur={handleSearchInputBlur}>
                    </SearchInput>
                    <i className="header-search-icon lee-icon-search"/>
                  </Fragment>
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
    handleSearchInputFocus(tags) {
      dispatch(actionCreators.searchFocused());
      if (tags.size === 0) {
        dispatch(actionCreators.getSearchOptionsTag());
      }
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