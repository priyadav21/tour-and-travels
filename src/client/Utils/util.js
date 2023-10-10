import React, { useEffect, useState } from 'react';
import config from '../../../config';

export const UNKNOWN_ERROR = 'Oops. Some error occurred. Try reloading the page';

export const getMenuMap = menuList => {
  let menuListMap = new Map();
  if (menuList && menuList.websiteMenuMainList)
    menuList.websiteMenuMainList.forEach(websiteMenuMain => {
      menuListMap.set(websiteMenuMain.location, websiteMenuMain.websiteMenuList);
    });
  return menuListMap;
};

export const getSeoFromTourDetail = (seoDetail, tourSeoDetail, imageHeader, location) => {
  seoDetail.title = tourSeoDetail && tourSeoDetail.title ? tourSeoDetail.title : '';
  seoDetail.metaKeyword =
    tourSeoDetail && tourSeoDetail.metaKeyword ? tourSeoDetail.metaKeyword : '';
  seoDetail.metaDescription =
    tourSeoDetail && tourSeoDetail.metaDescription ? tourSeoDetail.metaDescription : '';
  seoDetail.url =
    location && location.pathname ? location.pathname : seoDetail ? seoDetail.url : config.webUrl;
  seoDetail.coverImage =
    imageHeader && imageHeader.imageURL
      ? imageHeader.imageURL
      : seoDetail
      ? seoDetail.coverImg
      : '/img/bg-home2.jpeg';
};
export const getSeoFromMySeoDetail = (seoDetail, mySeoDetail, imageHeader, location) => {
  seoDetail.title = mySeoDetail && mySeoDetail.title ? mySeoDetail.title : '';
  seoDetail.metaKeyword = mySeoDetail && mySeoDetail.metaKeyword ? mySeoDetail.metaKeyword : '';
  seoDetail.metaDescription =
    mySeoDetail && mySeoDetail.metaDescription ? mySeoDetail.metaDescription : '';
  seoDetail.url =
    location && location.pathname ? location.pathname : seoDetail ? seoDetail.url : config.webUrl;
  seoDetail.coverImage =
    mySeoDetail && mySeoDetail.imageURL
      ? mySeoDetail.imageURL
      : seoDetail
      ? seoDetail.coverImg
      : '/img/bg-home2.jpeg';
};

export const createSeoDetail = (
  seoDetail,
  title,
  metaKeyword,
  metaDescription,
  location,
  coverImage
) => {
  seoDetail.title = title ? title : seoDetail.title;
  seoDetail.metaKeyword = metaKeyword ? metaKeyword : seoDetail.metaKeyword;
  seoDetail.metaDescription = metaDescription ? metaDescription : seoDetail.metaDescription;
  seoDetail.url = location ? location : seoDetail ? seoDetail.url : config.webUrl;
  seoDetail.coverImage = coverImage
    ? coverImage
    : seoDetail
    ? seoDetail.coverImg
    : '/img/bg-home2.jpeg';
  return seoDetail;
};

export const getRatingStar = rating => {
  return getRatingStarInner(rating);
};
function getRatingStarInner(rating) {
  var rowsall = [];
  for (var i = 0; i < rating; i++) {
    rowsall.push(<i class="fa fa-star"></i>);
  }
  return rowsall;
}

export const GetSliderComponent = websiteSliderList => {};
