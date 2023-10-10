import { FETCH_TOUR_LIST } from '../actions/tourList';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_TOUR_LIST:
      return action.payload;
    default:
      return state;
  }
};
