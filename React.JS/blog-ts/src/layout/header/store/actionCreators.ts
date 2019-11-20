import * as React from "react";
import * as actionType from "./actionType";
import axios from 'axios';
import {fromJS} from "immutable";

export interface HeaderAction {
	// Action类型
	type:string,

	// 搜索的推荐关键词数据
	data?:any
}

const changeSearchOptionsTag = (data:any) => {
  return {
    type: actionType.CHANGE_SEARCH_OPTIONS_TAG,
    data: fromJS(data)
  };
};

export const searchFocused = () => {
  return {
    type: actionType.SEARCH_FOCUSED
  }
};

export const searchBlur = () => {
  return {
    type: actionType.SEARCH_BLUR
  };
};

export const searchOptionsEnter = () => {
  return {
    type: actionType.SEARCH_OPTION_ENTER
  };
};

export const searchOptionsLeave = () => {
  return {
    type: actionType.SEARCH_OPTION_LEAVE
  };
};

export const getSearchOptionsTag = () => {
  return (dispatch:React.Dispatch<HeaderAction>) => {
    axios.get('/mock/searchOptionsTag.json').then((r) => {
      let res = r.data;
      if (res.code === 0) {
        dispatch(changeSearchOptionsTag(res.data));
      } else {
        dispatch(changeSearchOptionsTag([]));
      }
    });
  }
};
