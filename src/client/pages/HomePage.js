import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // ES6

import { fetchWebsiteMenuList } from '../actions/websiteMenu';
import { fetchWebsiteSetting } from '../actions/websiteMenu';
import MetaTags from '../Utils/metaTags';
import HomePageBanner from './HomePageBanner';
import BannerPill from './BannerPill';
import PopularDestCarousel from './PopularDestCarousel';
import MarketPlaceBanner from './MarketPlaceBanner';
import ReviewCarousel from './ReviewCarousel';
import DestinationCarousel from './DestinationCarousel';
import DestinationGrid from './DestinationGrid';
import SubscribeBox from './SubscribeBox';
import HowTourWork from './HowTourWork';

import Header from '../components/desktop/Header';
import { getMenuMap } from '../Utils/util';
import Footer from '../Components/desktop/Footer';

const HomePage = props => {
  const [websiteSetting, setWebsiteSetting] = useState(props.websiteSetting);
  const [websiteMenu, setWebsiteMenu] = useState(props.websiteMenu);

  let websiteMenuMap = getMenuMap(websiteMenu.websiteMenu);
  let websiteSettingMain = websiteSetting.websiteSetting.websiteSettingMain;
  let seoDetail = websiteSetting.websiteSetting.websiteSettingMain.seoDetail;

  const renderArticles = () => {
    return (
      <>
        {/* {
                JSON.stringify(websiteSetting)
              } */}
        <Header
          websiteMenuLeft={websiteMenuMap.get('PRIMARY_LEFT')}
          websiteMenuRight={websiteMenuMap.get('PRIMARY_RIGHT')}
          websiteSetting={websiteSetting}
          pageType="HOME"
        />

        <HomePageBanner></HomePageBanner>
              <BannerPill></BannerPill>
         <PopularDestCarousel></PopularDestCarousel>
        <HowTourWork></HowTourWork>
        {/* {allSliderData &&
              allSliderData.allSliderData &&
              allSliderData.allSliderData.allWebSliderList ? (
                <DestinationGridDy allSliderData={allSliderData.allSliderData}></DestinationGridDy>
              ) : (
                ''
              )} */}
        <MarketPlaceBanner></MarketPlaceBanner>
        <ReviewCarousel></ReviewCarousel> 
        <DestinationCarousel></DestinationCarousel>
              <DestinationGrid></DestinationGrid> 
        {websiteSettingMain && websiteSettingMain.isShowSubscribe ? (
          <SubscribeBox websiteSettingMain={websiteSettingMain}></SubscribeBox>
        ) : (
          ''
        )}
        <Footer
          websiteSetting={websiteSetting}
          websiteMenuFooter={websiteMenuMap.get('FOOTER_LEFT')}
          websiteMenuFooterRight={websiteMenuMap.get('FOOTER_RIGHT')}
        />
      </>
    );
  };
  const { articles, location, match } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
    //loadArticles();
  }, []);
  return (
    <div key={Math.random()}>
      {MetaTags.getAppMetaTags(seoDetail)}
      {renderArticles()}
    </div>
  );
};

const mapStateToProps = (state, _ownProps) => {
  /* console.log('pulling state');
  console.log(state); */
  return {
    websiteSetting: state.websiteSetting,
    
    websiteMenu: state.websiteMenu
  };
};
/* const mapDispatchToProps = dispatch => {
  return {
    getMockApi: () => dispatch(mockApi.getMockData())
  };
}; */

function doEverything(store, param) {
  return dispatch =>
    Promise.all([
      
    ]).then(() => {
      console.log('I did everything!');
    });
}

/* const loadData = (store, param) => {
        // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
        // So we need to use store itself to load data
        // return store.dispatch(doEverything(store,param)); // Manually dispatch a network request
      }; */
const loadData = (store, param) => {
  return Promise.all([
    
    store.dispatch(fetchWebsiteMenuList()),
    store.dispatch(fetchWebsiteSetting())
  ]);
};

HomePage.propTypes = {
  websiteMenu: PropTypes.objectOf(PropTypes.any),
  websiteSetting: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
  
  fetchWebsiteMenuList: PropTypes.func,
  fetchWebsiteSetting: PropTypes.func
};

HomePage.defaultProps = {
  
  websiteMenu: null,
  websiteSetting: null,
  location: null,
  match: null,
  
  fetchWebsiteMenuList: null
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onMountDispatch() {
    
    dispatch(fetchWebsiteMenuList());
    dispatch(fetchWebsiteSetting());
  }
});

const mergeProps = (stateProps, dispatchProps, _ownProps) => {
  const onMountDispatch = () => {
    const { host } = stateProps;
    dispatchProps.onMountDispatch();
  };
  const onUpdateDispatch = () => {
    const { host } = stateProps;
  };
  return {
    ...stateProps,
    ...dispatchProps,
    onMountDispatch,
    onUpdateDispatch
  };
};

export default {
  component: connect(mapStateToProps, mapDispatchToProps, mergeProps)(HomePage),
  loadData
};
