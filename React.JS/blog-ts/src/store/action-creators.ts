import {fromJS} from "immutable";
import { SetLoginInfo} from "./action-type";


export interface LoginAction {
	// Action类型
	type: string,

	// Action的list数据
	key?: string

	// Action的list是否为最后一页
	leeToken?: string
}

export const setLoginInfo = (result: LoginAction) => {
	return <LoginAction>{
		type: SetLoginInfo,
		list: result.key,
		isLastPage: result.leeToken,
	}
};
