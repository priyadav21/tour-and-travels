import { FETCH_WEBSITE_SETTING } from '../actions/websiteMenu';

const initialState = {
  websiteSetting:null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEBSITE_SETTING:
      return {
        ...state,
        websiteSetting: action.payload
      };
    default:
      return state;
  }
};
