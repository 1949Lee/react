import {Spin, message} from "antd";
import React, {Component, Fragment} from 'react';
import {NavLink, RouteComponentProps, withRouter} from "react-router-dom";
import {Routes} from "../../router";
import {Connect} from "../../utils/decorators";
import {actionCreators} from "./store";
import {Record, List} from "immutable";
import {HeaderConfig} from "../../config"
import * as style from "./style.scss";
import {CSSTransition} from 'react-transition-group';
import axios from 'axios';

const mapStateToProps = (state:Record<any>) => {
	return {
		searchBarFocused: state.getIn(['header', 'searchBarFocused']),
		searchOptionsActive: state.getIn(['header', 'searchOptionsActive']),
		searchOptionsTag: state.getIn(['header', 'searchOptionsTag'])
		// state.get('header').get('searchBarFocused')
	}
};

const mapDispatchToProps = (dispatch:any) => {
	return {
		handleSearchInputFocus(tags:List<any>) {
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


interface State extends React.ComponentState {

	// 搜索页数
	page: number;

	//是否隐藏导航栏，true表示隐藏导航栏，false表示显示导航栏
	toggle: boolean;
}

// interface PathParamsType {
// 	id?:string
// }
// RouteComponentProps<PathParamsType>可定义路由参数的数据类型

interface Props extends React.ComponentProps<any>,ReduxProps,RouteComponentProps{
	floatTop:boolean;
}

interface ReduxProps {
	searchBarFocused?:boolean;
	searchOptionsActive?:boolean;
	searchOptionsTag?:List<any>
	handleSearchInputFocus(tags:List<any>):void;
	handleSearchInputBlur():void;
	handleSearchOptionsEnter():void;
	handleSearchOptionsLeave():void;
}


@Connect(mapStateToProps,mapDispatchToProps)
class Header extends Component<Props, State> {

	searchOptionsChangeIcon:HTMLElement = null;
	toggleTimer:any = null;
	hoverShown:boolean= false;

	constructor(props: Props) {
		super(props);
		this.state = {page: 1, toggle: true};
	}

	componentDidMount() {
	}

	getSearchOptions() {
		let {searchBarFocused, searchOptionsActive, searchOptionsTag, handleSearchOptionsLeave, handleSearchOptionsEnter} = this.props;
		let {page} = this.state;
		if(searchOptionsTag) {
			const tags = searchOptionsTag.toJS().slice((page - 1) * 10, (page - 1) * 10 + 9);
			if ((searchBarFocused || searchOptionsActive) && searchOptionsTag.size > 0) {
				return (
					<div className={style['search-options']} onMouseEnter={handleSearchOptionsEnter} onMouseLeave={handleSearchOptionsLeave}>
						<div className={style['search-options-title']}>
							热门搜索
							<span className={style['search-options-change']} onClick={this.handleSearchOptionsChange}>
								<i style={{transform: 'rotate(0deg)'}} ref={(icon) => {
									this.searchOptionsChangeIcon = icon
								}} className={`${style['icon']} lee-icon-refresh`}/>
								<span className={style['text']}>换一批</span>
							</span>
						</div>
						<div className={style['search-options-tag-list']}>
							{
								tags.map((tag) => {
									return <span className={style['search-options-tag']} key={tag}>{tag}</span>
								})
							}
						</div>
					</div>
				)
			}
		} else {
			return null;
		}
	}

	handleSearchOptionsChange = () =>{
		let origin = this.searchOptionsChangeIcon.style.transform.match(/[0-9]+/)[0];
		this.searchOptionsChangeIcon.style.transform = `rotate(${+origin + 360}deg)`;
		if (this.state.page * 10 > this.props.searchOptionsTag.size) {
			this.setState({page: 1});
			return;
		}
		this.setState({page: this.state.page + 1});
	};

	handleWriteArticle = () => {
		if (this.props.history.location.pathname === Routes.newArticle){
			return
		}
		const hide = message.loading('准备中..', 0);
		// Dismiss manually and asynchronously
		axios.post("http://localhost:1314/new-article-id",{}).then((res:any) => {
			if(res.data.code === 0 && res.data.data){
				this.props.history.push(`/new-article/${res.data.data}`);
				hide();
			} else {
				hide();
			}
		},() => {
			hide();
		});
	};

	toggleFloat = (action?:boolean) => {
		if(this.toggleTimer) {
			clearTimeout(this.toggleTimer);
			this.toggleTimer = null;
		}
		if (action !== undefined){
			if (action){
				if (!this.state.toggle) {
					this.setState({toggle:true});
				}
			}else {
				if (this.state.toggle) {
					this.setState({toggle:false});
				}
			}
		} else {
			this.setState({toggle:!this.state.toggle});
		}
	};

	debounceShow = () => {
		if(this.props.floatTop && this.state.toggle) {
			this.toggleTimer = setTimeout(() => {
				this.toggleFloat(false);
				this.hoverShown = true;
			},1200);
		}
	};

	clearDebounceShow = () => {
		if(this.toggleTimer) {
			clearTimeout(this.toggleTimer);
			this.toggleTimer = null;
			this.hoverShown = false;
		}
	};

	hide = () => {
		if(this.hoverShown && !(this.props.floatTop&&this.state.toggle)){
			this.toggleFloat(true);
			this.hoverShown = false;
		}
	};

	render() {
		let {searchBarFocused, handleSearchInputFocus, handleSearchInputBlur,floatTop} = this.props;
		return (
			<CSSTransition
				in={floatTop && this.state.toggle}
				timeout={500}
				classNames="toggle">
				<Fragment>
					<nav className={style['header-container']+(floatTop && this.state.toggle?' '+style['float']:"")} onMouseLeave={this.hide}>
						<div className={style['header-wrapper']}>
							<span className={style['logo']}>镜中之人</span>
							<div className={style['menu-list']}>
								<div className={style['menu-wrapper']}>
									<NavLink exact className={style['nav-link']} to="/" activeClassName={style['active']}>
										<div className={style['menu-item']}>
											<i className={`${style['menu-icon']} lee-icon-home`}/>
											<span className={style['text']}>首页</span>
										</div>
									</NavLink>
									<NavLink exact className={style['nav-link']} to="/category" activeClassName={style['active']}>
										<div className={style['menu-item']}>目录</div>
									</NavLink>
									<div className={style['search-wrapper']}>
										<CSSTransition
											in={searchBarFocused}
											timeout={500}
											classNames="grow-width">
											<Fragment>
												<input
													type="text"
													className={style['search-input']+(searchBarFocused ? ' '+style['focused'] : '')}
													placeholder="搜索"
													onFocus={()=>{handleSearchInputFocus(this.props.searchOptionsTag as List<any>)}}
													onBlur={handleSearchInputBlur}>
												</input>
												<i className={`${style['header-search-icon']} lee-icon-search`}/>
											</Fragment>
										</CSSTransition>
										{this.getSearchOptions()}
									</div>
								</div>
								<div className={style['menu-wrapper']}>
									{/*<MenuItem>Aa</MenuItem>*/}
									<div className={style['menu-item']}>关于博主</div>
								</div>
							</div>
							<div className={style['header-options']}>
								<div className={style['button-group']}>
									<button className="lee-btn" type="button" onClick={this.handleWriteArticle}>写文章</button>
									<button className="lee-btn" type="button">我的作品</button>
								</div>
							</div>
						</div>
						{floatTop ?
							<span className={style['fold-toggle-wrapper']} onClick={() => {this.toggleFloat()}} onMouseOver={this.debounceShow} onMouseLeave={this.clearDebounceShow}>
								<i className={`${style['fold-toggle']} lee-icon-folded`}/>
							</span>
							: null}
					</nav>
					{
						!(floatTop && this.state.toggle)?<div style={HeaderConfig}></div>:null

					}
				</Fragment>
			</CSSTransition>
		);
	}

}


export default withRouter(Header);
