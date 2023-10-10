import { FETCH_TOUR_DETAIL } from '../actions/tourList';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_TOUR_DETAIL:
      return action.payload;
    default:
      return state;
  }
};
