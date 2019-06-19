const defaultSate = {
  searchBarFocused:false
};

const reducer = (state = defaultSate, action) => {
  let newState = Object.assign({},state);
  // let newState = state;
  if(action.type === 'header_search_focused') {
    newState.searchBarFocused = true;
    return newState;
  }
  if(action.type === 'header_search_blur') {
    newState.searchBarFocused = false;
    return newState;
  }
  return state
};

export default reducer;