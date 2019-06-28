import * as actionType from "./actionType";
import {fromJS} from "immutable";

const defaultSate = fromJS({
  searchBarFocused:false,
  searchOptionsTag:[]
});

const reducer = (state = defaultSate, action) => {
  // let newState = state;

  switch (action.type) {
    case actionType.SEARCH_FOCUSED:
      return state.set('searchBarFocused',true);
    case actionType.SEARCH_BLUR:
      return state.set('searchBarFocused',false);
    case actionType.CHANGE_SEARCH_OPTIONS_TAG:
      return state.set('searchOptionsTag',action.data);
    default:
      break;
  }
  return state
};

export default reducer;