import { FETCH_WEBSITE_POST } from '../actions/index';

const initialState = {
  websitePost: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEBSITE_POST:
      return {
        ...state,
        websitePost: action.payload
      };
    default:
      return state;
  }
};
