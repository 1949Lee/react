import {HeaderAction} from "./actionCreators";
import * as actionType from "./actionType";
import {fromJS} from "immutable";

const defaultSate = fromJS({
  searchBarFocused:false,
  searchOptionsActive:false,
  searchOptionsTag:[]
});

const reducer = (state = defaultSate, action:HeaderAction) => {
  // let newState = state;

  switch (action.type) {
    case actionType.SEARCH_FOCUSED:
      return state.set('searchBarFocused',true);
    case actionType.SEARCH_BLUR:
      return state.set('searchBarFocused',false);
    case actionType.CHANGE_SEARCH_OPTIONS_TAG:
      return state.set('searchOptionsTag',action.data);
    case actionType.SEARCH_OPTION_ENTER:
      return state.set('searchOptionsActive',true);
    case actionType.SEARCH_OPTION_LEAVE:
      return state.set('searchOptionsActive',false);
    default:
      return state;
  }
};

export default reducer;
