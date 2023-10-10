import axios from 'axios';
import config from '../../../config';

export const menu_list = config.cmsApiUrl + 'website_menu';
export const website_setting = config.cmsApiUrl + 'website_setting';
export const FETCH_WEBSITE_MENU= 'fetch_website_menu';
export const FETCH_WEBSITE_SETTING = 'fetch_website_setting';

export const fetchWebsiteMenuList = source => async dispatch => {
  let data = { "appKey": config.apiKey};
  const res = await axios
    .post(menu_list, data)
    .then(function(response) {
      if (response.status === 200 && response != null) {
        var data = response.data;
        // console.log('data from fetchWebsiteMenuList' + data);
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
    type: FETCH_WEBSITE_MENU,
    payload: res
  });
};


export const fetchWebsiteSetting = source => async dispatch => {
  let data = {
    "appKey": config.apiKey
  };
  const res = await axios
    .post(website_setting, data)
    .then(function (response) {
      if (response.status === 200 && response != null) {
        var data = response.data;
        // console.log('data from fetchWebsiteSetting' + JSON.stringify(
        //   response.data));
        return data;
      } else {
        throw new Error('Empty data');
      }
    })
    .catch(function (error) {
      // console.log(error);
      return []; // Return empty array in case error response.
    });
  dispatch({
    type: FETCH_WEBSITE_SETTING,
    payload: res
  });
};
