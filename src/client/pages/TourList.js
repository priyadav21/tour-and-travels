import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // ES6
import { fetchTourList } from '../actions/tourList';

import { fetchWebsiteMenuList, fetchWebsiteSetting } from '../actions/websiteMenu';
import MetaTags from '../Utils/metaTags';
import HomePageBanner from './HomePageBanner';
import BannerPill from './BannerPill';
import PopularDestCarousel from './PopularDestCarousel';
import MarketPlaceBanner from './MarketPlaceBanner';
import ReviewCarousel from './ReviewCarousel';
import DestinationCarousel from './DestinationCarousel';
import DestinationGrid from './DestinationGrid';
import SubscribeBox from './SubscribeBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import HowTourWork from './HowTourWork';
import DestinationGridDy from './DestinationGridDy';

import Header from '../components/desktop/Header';
import Footer from '../components/desktop/Footer';
import config from '../../../config';
import { getMenuMap, createSeoDetail } from '../Utils/util';
import TourDetailsCard from '../Components/businessComponents/tourDetailsCard';
import TextSearch from '../Components/businessComponents/TextSearch';

const TourList = props => {
  const [tourListData, setTourListData] = useState(props.tourListData);
  const [websiteSetting, setWebsiteSetting] = useState(props.websiteSetting);

  const [websiteMenu, setWebsiteMenu] = useState(props.websiteMenu);

  let websiteMenuMap = getMenuMap(websiteMenu.websiteMenu);
  let websiteSettingMain = websiteSetting.websiteSetting.websiteSettingMain;
  let seoDetail = websiteSetting.websiteSetting.websiteSettingMain.seoDetail;

  const metaTitle = 'Make your travel plan today';
  const metaDesc = '';
  const keyword = '';
  const path = `${config.webUrlNoSlash}/tour-package}`;

  seoDetail = createSeoDetail(seoDetail, metaTitle, keyword, metaDesc, path, '');
  const renderArticles = () => {
    return (
      /* <!--Slider Section Start--> */
      <div>
        {
          // JSON.stringify(tourListData)
        }
        <Header
          websiteMenuLeft={websiteMenuMap.get('PRIMARY_LEFT')}
          websiteMenuRight={websiteMenuMap.get('PRIMARY_RIGHT')}
          websiteSetting={websiteSetting}
        />
        <div className="blue-grey-section">
          <div className="section-parallax d-none d-md-block">
            <div className="parallax pb-5 pt-5">
              <div className="container mt-5 pt-4 mb-5">
                <div className="suppler-contact text-white text-center text-shadow">
                  <h1>Best Tour Packages</h1>
                </div>
              </div>
            </div>
          </div>
          <TextSearch tourListData={tourListData} />
        </div>

        {/* {allSliderData &&
              allSliderData.allSliderData &&
              allSliderData.allSliderData.allWebSliderList ? (
                <AllSlider allSliderData={allSliderData.allSliderData}></AllSlider>
              ) : (
                ''
              )} */}

        {/* <MarketPlaceBanner></MarketPlaceBanner> */}
        {/* <ReviewCarousel></ReviewCarousel> */}
        {/* <DestinationCarousel></DestinationCarousel>
              <DestinationGrid></DestinationGrid> */}

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
      </div>
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
  console.log(state.tourListData);
  return {
    tourListData: state.tourListData,
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
    Promise.all([]).then(() => {
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
    store.dispatch(fetchTourList()),

    store.dispatch(fetchWebsiteMenuList()),
    store.dispatch(fetchWebsiteSetting())
  ]);
};

TourList.propTypes = {
  tourListData: PropTypes.objectOf(PropTypes.any),
  websiteMenu: PropTypes.objectOf(PropTypes.any),
  websiteSetting: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
  fetchWebsiteMenuList: PropTypes.func,
  fetchWebsiteSetting: PropTypes.func
};

TourList.defaultProps = {
  tourListData: [],

  websiteMenu: null,
  websiteSetting: null,
  location: null,
  match: null,
  fetchWebsiteMenuList: null
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onMountDispatch() {
    dispatch(fetchTourList()), dispatch(fetchWebsiteMenuList());
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
  component: connect(mapStateToProps, mapDispatchToProps, mergeProps)(TourList),
  loadData
};
