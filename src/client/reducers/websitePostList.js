import { FETCH_WEBSITE_POST_LIST } from '../actions/index';

const initialState = {
  websitePostList: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEBSITE_POST_LIST:
      return {
        ...state,
        websitePostList: action.payload
      };
    default:
      return state;
  }
};
