import React, {Component, ReducerState} from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Connect} from "../../utils/decorators";
import {actionCreators} from "./store";


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

interface Props extends React.ComponentProps<any>,RouteComponentProps{

}

const mapStateToProps = (state:any) => {
	return {
		searchBarFocused: state.getIn(['header', 'searchBarFocused']),
		searchOptionsActive: state.getIn(['header', 'searchOptionsActive']),
		searchOptionsTag: state.getIn(['header', 'searchOptionsTag'])
		// state.get('header').get('searchBarFocused')
	}
};

const mapDispatchToProps = (dispatch:any) => {
	return {
		handleSearchInputFocus(tags:any) {
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

@Connect(mapStateToProps,mapDispatchToProps)
class Header extends Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {page: 1, toggle: true};
	}

	componentDidMount() {
		console.log(this.props);
	}

	render() {
		return (
			<div>Header</div>
		);
	}

}


export default withRouter(Header);
// export default Header;
