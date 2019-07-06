import {fromJS} from "immutable";
import {MoreArticleList,InitArticleList} from "./actionType";
import axios from "axios";


const resetArticleList = (result) => {
  return {
    type:InitArticleList,
    list:fromJS(result)
  }
};
const moreArticleList = (result) => {
  return {
    type:MoreArticleList,
    list:fromJS(result)
  }
};

export const getArticleList = ({type,data}) => {
  return (dispatch) => {
    if(type === 'init') {
      axios.get('/mock/articleList.json').then((r) => {
        let res = r.data;
        if (res.code === 0) {
          dispatch(resetArticleList(res.data.list));
        } else {
          dispatch(resetArticleList([]));
        }
      });
    } else {
      axios.get('/mock/articleList.json').then((r) => {
        let res = r.data;
        if (res.code === 0) {
          dispatch(moreArticleList(res.data.list));
        } else {
          dispatch(moreArticleList([]));
        }
      });
    }
  }
};

export const initArticleList = () => {
  return getArticleList('init');
}