import { FETCH_WEBSITE_MENU } from '../actions/websiteMenu';

const initialState = {
  websiteMenu: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEBSITE_MENU:
      return {
        ...state,
        websiteMenu: action.payload
      };
    default:
      return state;
  }
};
