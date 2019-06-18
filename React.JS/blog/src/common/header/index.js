import React, {Component} from 'react';
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
import { CSSTransition } from 'react-transition-group';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarFocused:false
    };
    this.handleSearchInputFocus = this.handleSearchInputFocus.bind(this);
    this.handleSearchInputBlur = this.handleSearchInputBlur.bind(this);
  }

  handleSearchInputFocus() {
    this.setState({
      searchBarFocused:true
    })
  }

  handleSearchInputBlur() {
    this.setState({
      searchBarFocused:false
    })
  }

  render() {
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
                  in={this.state.searchBarFocused}
                  timeout={500}
                  classNames="grow-width">
                  <SearchInput
                    className={this.state.searchBarFocused ? "focused": ""}
                    placeholder="输入关键字查询"
                    onFocus={this.handleSearchInputFocus}
                    onBlur={this.handleSearchInputBlur}>
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
  }
}

export default Header