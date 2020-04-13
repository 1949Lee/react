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

export const setLoginInfo = (result?: LoginAction) => {
	if (result) {
		return <LoginAction>{
			type: SetLoginInfo,
			key: result.key,
			leeToken: result.leeToken,
		}
	} else {
		return <LoginAction>{
			type: SetLoginInfo,
			key: null,
			leeToken: null,
		}
	}
};
