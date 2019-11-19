import H from "history";
import {Switch as S,useLocation,useHistory,SwitchProps} from 'react-router-dom';
import React, {useEffect} from 'react';

interface Props extends SwitchProps{
	onChange:(history:H.History<any>) => void;
}

function SwitchWithLocationChange(props:Props) {
	let location = useLocation();
	let history = useHistory();
	let {onChange,...passThrough} = props;
	useEffect(() => {
		if(onChange) {
			onChange(history);
		}
	},[location,history,onChange]);
	return <S {...passThrough} />
}

export default SwitchWithLocationChange
