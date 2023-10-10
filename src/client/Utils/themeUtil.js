import React, { useEffect, useState } from 'react';
import Header1 from '../components/desktop/Header1';
import Header2 from '../components/desktop/Header2';

export const UNKNOWN_ERROR = 'Oops. Some error occurred. Try reloading the page';

export const GetHeaderComponent = (websiteMenuLeft, websiteMenuRight, websiteSetting) => {
  let returnValue = [];
  console.log('webtheme.headerTemplate');
  console.log(webtheme.headerTemplate);
  if (webtheme.headerTemplate == '1') {
    returnValue.push(<Header1 websiteSlider={websiteSlider} />);
  }
  if (webtheme.headerTemplate == '2') {
    returnValue.push(<Header2 websiteSlider={websiteSlider} />);
  }
  return returnValue;
};

export const GetFooterComponent = webtheme => {
  let returnValue = [];
  console.log('webtheme.footerTemplate');
  console.log(webtheme.footerTemplate);
  if (webtheme.footerTemplate == '1') {
    returnValue.push(<Header1 websiteSlider={websiteSlider} />);
  }
  if (webtheme.footerTemplate == '2') {
    returnValue.push(<Header2 websiteSlider={websiteSlider} />);
  }
  return returnValue;
};

export const getSliderStyle = websiteSlider => {
  let sliderStyle = {
    bgColor: websiteSlider.boxColor ? `${websiteSlider.boxColor} !important` : '#fff',
    color: websiteSlider.bannerColor ? `${websiteSlider.textColor} !important` : '#000',
    image:
      websiteSlider.imageHeaderData && websiteSlider.imageHeaderData.imageURL
        ? `url('${websiteSlider.imageHeaderData.imageURL}')`
        : 'none',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };
  return sliderStyle;
};
export const getBannerStyle = allWebSliderContent => {
  let sliderStyle = {
    bgColor: allWebSliderContent.boxColor ? `${allWebSliderContent.boxColor} !important` : '#fff',
    color: allWebSliderContent.textColor ? `${allWebSliderContent.textColor} !important` : '#000'
  };
  return sliderStyle;
};
