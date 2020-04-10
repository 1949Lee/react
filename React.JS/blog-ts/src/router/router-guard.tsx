import H from "history";
import {
	Switch as S,
	useLocation,
	useHistory,
	SwitchProps,
	useRouteMatch,
	match,
	Prompt,
	BrowserRouter
} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import store from "../store";
import {Routes} from "./index";

interface Props extends SwitchProps{
	onChange:(location:H.Location<any>,history:H.History<any>) => void;
}

export const AdminRoute = [
	Routes.newArticle,
	Routes.updateArticle
];

function SwitchWithLocationChange(props:Props) {
	let location = useLocation();
	let history = useHistory();
	let match = useRouteMatch();
	let [prevLocation, setPrevLocation] = useState(null);
	let {onChange,...passThrough} = props;
	// useStateHook测试代码，在Hook中使用useState的hook
	if(!prevLocation || (location.key !== prevLocation.key)){
		// 路由变更之前。
		setPrevLocation(location)
	}
	if (AdminRoute.find((r) => r.regexp.test(location.pathname))) {
		if(!store.getState().getIn(["app","leeToken"])) {
			history.replace({pathname:Routes.home.path});
		}

	}
	useEffect(() => {
		// 路由变更之之后。
		if(onChange) {
			onChange(location,history);
		}
	},[location,history,onChange]);
	return <S {...passThrough} />
}

export default SwitchWithLocationChange
