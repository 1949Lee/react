import * as actionType from "./actionType";
import axios from 'axios';
import {fromJS} from "immutable";

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

export const changeSearchOptionsTag = (data) => {
  return {
    type: actionType.CHANGE_SEARCH_OPTIONS_TAG,
    data: fromJS(data)
  };
};

export const getSearchOptionsTag =() => {
  return (dispatch) => {
    axios.get('/mock/searchOptionsTag.json').then((r) => {
      let res = r.data;
      if(res.code === 0){
        dispatch(changeSearchOptionsTag(res.data));
      } else {
        dispatch(changeSearchOptionsTag([]));
      }
    });
  }
};