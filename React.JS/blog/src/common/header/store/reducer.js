import * as actionType from "./actionType";
import {fromJS} from "immutable";

const defaultSate = fromJS({
  searchBarFocused:false
});

const reducer = (state = defaultSate, action) => {
  // let newState = state;
  if(action.type === actionType.SEARCH_FOCUSED) {
    return state.set('searchBarFocused',true);
  }
  if(action.type === actionType.SEARCH_BLUR) {
    return state.set('searchBarFocused',false);
  }
  return state
};

export default reducer;