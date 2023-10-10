import { FETCH_ALLWEB_SLIDER, FETCH_ALL_SLIDER } from '../actions/index';

const initialState = {
  allSliderData: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALLWEB_SLIDER:
      return {
        ...state,
        allSliderData: action.payload
      };
    case FETCH_ALL_SLIDER:
      return {
        ...state,
        allSliderData: action.payload
      };
    default:
      return state;
  }
};
