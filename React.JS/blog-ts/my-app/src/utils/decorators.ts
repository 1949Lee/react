import {connect} from "react-redux";

// redux 的connect的装饰器封装
export function Connect (state?:any,props?:any):any {
	return connect(state,props)
}
