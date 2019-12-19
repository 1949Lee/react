import H from "history";
import {Switch as S, useLocation, useHistory, SwitchProps, useRouteMatch, match} from 'react-router-dom';
import React, {useEffect} from 'react';

interface Props extends SwitchProps{
	onChange:(location:H.Location<any>,history:H.History<any>) => void;
}

function SwitchWithLocationChange(props:Props) {
	let location = useLocation();
	let history = useHistory();
	let match = useRouteMatch();
	let {onChange,...passThrough} = props;
	useEffect(() => {
		if(onChange) {
			onChange(location,history);
		}
	},[location,history,onChange]);
	return <S {...passThrough} />
}

export default SwitchWithLocationChange
