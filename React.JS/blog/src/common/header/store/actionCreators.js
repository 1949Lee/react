import * as actionType from "./actionType";

export const searchFocused = () => {
  return {
    type:actionType.SEARCH_FOCUSED
  }
};

export const searchBlur = () => {
  return {
    type:actionType.SEARCH_BLUR
}
};