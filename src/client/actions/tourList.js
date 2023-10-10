import axios from 'axios';
import config from '../../../config';
export const tour_list = config.cmsApiUrl +'tour_search';
export const tour_detail = config.cmsApiUrl + 'tour_detail';
export const FETCH_TOUR_LIST= 'fetch_tour_list';
export const FETCH_TOUR_DETAIL = 'fetch_tour_detail';

export const fetchTourList = source => async dispatch => {
  let data = { "appKey": config.apiKey, "allTour": true, "limit": 30, "passengerCount": 0, "perDayPricingFilter": false, "promotional": false };
  const res = await axios
    .post(tour_list, data)
    .then(function(response) {
      if (response.status === 200 && response != null) {
        var data = response.data;
        console.log('data from fetchTourList' + data);
        return data;
      } else {
        throw new Error('Empty data');
      }
    })
    .catch(function(error) {
      // console.log(error);
      return []; // Return empty array in case error response.
    });
  dispatch({
    type: FETCH_TOUR_LIST,
    payload: res
  });
};

export const fetchTourDetail = source => async dispatch => {
  let data = { "appKey": config.apiKey, "tourCode": source };
  console.log('query data from fetchTourDetail ' + JSON.stringify(data));
  const res = await axios
    .post(tour_detail, data)
    .then(function (response) {
      if (response.status === 200 && response != null) {
        var data = response.data;
        console.log('data from fetchTourDetail ' + JSON.stringify(data));
        return data;
      } else {
        throw new Error('Empty data');
      }
    })
    .catch(function (error) {
      console.log(error);
      return []; // Return empty array in case error response.
    });
  dispatch({
    type: FETCH_TOUR_DETAIL,
    payload: res
  });
};
