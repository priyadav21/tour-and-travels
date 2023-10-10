import { combineReducers } from 'redux';

import websitePostList from './websitePostList';
import websitePost from './websitePost';
import allSliderData from './allSliderData';
import tourListReducer from './tourList';
import tourDetailReducer from './tourDetail';
import websiteMenu from './websiteMenu';
import websiteSetting from './websiteSetting';
import websiteCategoryList from './websiteCategoryList';

const rootReducer = combineReducers({
  tourListData: tourListReducer,
  tourDetailData: tourDetailReducer,
  websitePost: websitePost,
  websitePostList: websitePostList,
  websiteMenu: websiteMenu,
  websiteSetting:websiteSetting,
  websiteCategoryList: websiteCategoryList,
});
export default rootReducer;
