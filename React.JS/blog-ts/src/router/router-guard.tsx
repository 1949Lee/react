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
import {Routes} from "./index";

interface Props extends SwitchProps{
	onChange:(location:H.Location<any>,history:H.History<any>) => void;
}

export const AdminRoute = [
	Routes.newArticle
];

function SwitchWithLocationChange(props:Props) {
	let location = useLocation();
	let history = useHistory();
	let match = useRouteMatch();
	let [prevLocation, setPrevLocation] = useState(null);
	let {onChange,...passThrough} = props;
	// let prompt = history.block((location,action) => {
	// 	if (AdminRoute.find((r) => r.regexp.test(location.pathname))) {
	// 		if(true) {
	// 			return false
	// 		} else {
	// 			return
	// 		}
	// 	}
	// });
	if(!prevLocation || (location.key !== prevLocation.key)){
		if (!prevLocation || (location.key !== prevLocation.key)) {
			// 路由变更之前。
			setPrevLocation(location)
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
