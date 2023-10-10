import axios from 'axios';
import config from '../../../config';

export const post_url = config.cmsApiUrl + 'website_landing_page';
export const post_list_url = config.cmsApiUrl + 'website_post_list';
export const post_category_url = config.cmsApiUrl + 'website_post_category';

export const FETCH_WEBSITE_POST = 'fetch_website_post';
export const FETCH_WEBSITE_POST_LIST = 'fetch_website_post_list';
export const FETCH_WEBSITE_CATEGORY_LIST = 'fetch_website_category_list';

export const fetchWebsiteCategoryList = source => async dispatch => {
  let data = {
    appKey: config.apiKey
  };
  console.log("WebsiteCategory Call " + data);
  const res = await axios
    .post(post_category_url, data)
    .then(function (response) {
      if (response.status === 200 && response != null) {
        var data = response.data;
        // console.log(data);
        return data;
      } else {
        throw new Error('Empty data');
      }
    })
    .catch(function (error) {
      console.log(error);
      return null; // Return empty array in case error response.
    });
  dispatch({
    type: FETCH_WEBSITE_CATEGORY_LIST,
    payload: res
  });
};

export const fetchWebsitePost = source => async dispatch => {
  let data = {
    appKey: config.apiKey,
    pageName: source
  };
  console.log("getting data");
  const res = await axios
    .post(post_url, data)
    .then(function(response) {
      if (response.status === 200 && response != null) {
        var data = response.data;
        // console.log("getting data: " + JSON.stringify(data));
        return data;
      } else {
        throw new Error('Empty data');
      }
    })
    .catch(function(error) {
      console.log(error);
      return null; // Return empty array in case error response.
    });

  dispatch({
    type: FETCH_WEBSITE_POST,
    payload: res
  });
};

export const fetchWebsitePostList = (source,wpType,wpLoc) => async dispatch => {
  // console.log(source);
  let data = {
    appKey: config.apiKey,
    "wpType": wpType ? wpType:"POST",
    "wpLoc": wpLoc ? wpLoc :"BLOG",
    category: source
  };
  console.log(data);
  const res = await axios
    .post(post_list_url, data)
    .then(function(response) {
      if (response.status === 200 && response != null) {
        var data = response.data;
        console.log(data);
        return data;
      } else {
        throw new Error('Empty data');
      }
    })
    .catch(function(error) {
      // console.log(error);
      return null; // Return empty array in case error response.
    });

  dispatch({
    type: FETCH_WEBSITE_POST_LIST,
    payload: res
  });
};
