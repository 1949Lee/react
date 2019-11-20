import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";

// redux 的connect的装饰器封装
export function Connect (state?:any,props?:any):any {
	return connect(state,props)
}
