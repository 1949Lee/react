const defaultSate = {
  headerSearchBarFocused:false
};

export const reducer = (state = defaultSate, action) => {
  let newState = Object.assign({},state);
  // let newState = state;
  if(action.type === 'header_search_focused') {
    newState.headerSearchBarFocused = true;
    return newState;
  }
  if(action.type === 'header_search_blur') {
    newState.headerSearchBarFocused = false;
    return newState;
  }
  return state
};