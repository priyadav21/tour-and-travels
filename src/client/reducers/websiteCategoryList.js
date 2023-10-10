import { FETCH_WEBSITE_CATEGORY_LIST } from '../actions/index';

const initialState = {
  websiteCategoryList: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEBSITE_CATEGORY_LIST:
      return {
        ...state,
        websiteCategoryList: action.payload
      };
    default:
      return state;
  }
};
