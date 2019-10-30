import {Switch as S,useLocation,useHistory} from 'react-router-dom'
import React, {useEffect} from 'react';

function SwitchWithLocationChange(props) {
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
