/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWebsitePost } from '../actions';

import { fetchWebsiteMenuList, fetchWebsiteSetting } from '../actions/websiteMenu';
import MetaTags from '../Utils/metaTags';
import ShareButtonLink from './shareButtonLink';
import config from '../../../config';
import Footer from '../components/desktop/Footer';
import { getMenuMap, createSeoDetail } from '../Utils/util';
import DiscoveryFooterBanner from './DiscoveryFooterBanner';
import ServiceFooterBanner from './ServiceFooterBanner';
import SubscribeBox from './SubscribeBox';
import Header from '../components/desktop/Header';

const StaticPageHome = props => {
  const { websitePost, location, match } = props;
  
  const [websiteMenu, setWebsiteMenu] = useState(props.websiteMenu);
  const [websiteSetting, setWebsiteSetting] = useState(props.websiteSetting);
  let websiteMenuMap = getMenuMap(websiteMenu.websiteMenu);
  let websiteSettingMain = websiteSetting.websiteSetting.websiteSettingMain;

  const { fetchWebsitePost: loadArticles } = props;
  console.log('I am inside static page' + props);

  const [websiteContent, setWebsiteContent] = useState(
    props.websitePost != null &&
      props.websitePost.websiteContent != null &&
      props.websitePost.websiteContent
      ? props.websitePost.websiteContent
      : null
  );
  const [websiteSection, setWebsiteSection] = useState(
    props.websitePost != null &&
      props.websitePost.websiteContent != null &&
      props.websitePost.websiteContent.websiteSection
      ? props.websitePost.websiteContent.websiteSection
      : null
  );
  const [seoDetailPost, setSeoDetailPost] = useState(
    props.websitePost != null &&
      props.websitePost.websiteContent != null &&
      props.websitePost.websiteContent.seoDetail
      ? props.websitePost.websiteContent.seoDetail
      : null
  );
  const [imageHeader, setImageHeader] = useState(
    props.websitePost != null &&
      props.websitePost.websiteContent != null &&
      props.websitePost.websiteContent.imageHeaderData
      ? props.websitePost.websiteContent.imageHeaderData
      : null
  );

  let seoDetail = websiteSetting.websiteSetting.websiteSettingMain.seoDetail;
  const metaTitle =
    seoDetailPost && seoDetailPost.title
      ? seoDetailPost.title
      : `Touroxy : Your Best Website and Business Solution`;
  const metaDesc =
    seoDetailPost && seoDetailPost.metaDescription ? seoDetailPost.metaDescription : '';
  const keyword = seoDetailPost && seoDetailPost.metaKeyword ? seoDetailPost.metaKeyword : '';
  const coverImg = imageHeader && imageHeader.imageURL ? imageHeader.imageURL : '';
  const path = `${config.webUrlNoSlash}/blog/${
    websiteContent != null ? websiteContent.externalLink : ''
  }`;

  seoDetail = createSeoDetail(seoDetail, metaTitle, keyword, metaDesc, path, coverImg);
  const renderWebsitePost = () => {
    return (
      <div>
        <Header
          websiteMenuLeft={websiteMenuMap.get('PRIMARY_LEFT')}
          websiteMenuRight={websiteMenuMap.get('PRIMARY_RIGHT')}
          websiteSetting={websiteSetting}
        />
        {websiteSection.title || websiteSection.subTitle || coverImg ? (
          <div
            className={`section-parallax-staticPages ${
              websiteContent ? 'min-container-height' : ''
            }`}
            style={{
              backgroundImage: `url('${coverImg}`
            }}
          >
            {(websiteSection && websiteSection.title) ||
            (websiteSection && websiteSection.subTitle) ? (
              <div
                className={`a ${
                  config.apiKey == 'XBgZosx4cibxt5IDsvuhhxu6jHGYOuH8' ? 'parallax_pink' : 'parallax'
                }`}
              >
                <div className="container">
                  {websiteSection && websiteSection.title ? (
                    <h2 className="text-white text-center font-weight-bold">
                      {websiteSection.title}
                    </h2>
                  ) : (
                    ''
                  )}
                  {websiteSection && websiteSection.subTitle ? (
                    <h5 className="text-center">{websiteSection.subTitle}</h5>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
        {websiteSection && websiteSection.topSectionTxt1 ? (
          <div
            className={`section-white-padding-less bg-transparent ${
              websiteContent ? '' : 'min-container-height'
            }`}
          >
            <div className="container">
              {/* <h3 className="caption font-weight-normal font-25 text-left mb-2">
            </h3> */}
              {websiteContent != null &&
              websiteContent.externalLink != null &&
              websiteContent.externalLink != 'free-website' ? (
                <hr className="section_header-divider hideme" />
              ) : (
                ''
              )}
              {/* {websiteContent != null && websiteContent.externalLink != null ? (
              <div className="share-btn">
                <ShareButtonLink
                  imageUrl={coverImg}
                  title={websiteSection ? websiteSection.title : 'Touroxy'}
                  linkUrl={`${config.webUrlNoSlash}/blog/${websiteContent != null &&
                    websiteContent.externalLink != null?
                    websiteContent.externalLink:''}`}
                ></ShareButtonLink>
              </div>
            ) : (
              ''
            )} */}
              {websiteSection && websiteSection.topSectionTxt1 ? (
                <div
                  className="font-18 font-weight-500"
                  dangerouslySetInnerHTML={{
                    __html:
                      websiteSection && websiteSection.topSectionTxt1
                        ? websiteSection.topSectionTxt1
                        : ''
                  }}
                ></div>
              ) : (
                ''
              )}
            </div>
          </div>
        ) : (
          ''
        )}
        {websiteContent != null && websiteContent.externalLink == 'free-website' ? (
          <div className="section-white pt-0 pb-0 ">
            <div className="container">
              <div className="row py-5 px-4 border-radius-25">
                <div className="col-md-6 d-none d-md-block">
                  <img
                    src="/img/free-web.png"
                    className=""
                    style={{ height: '100vh', width: '100%' }}
                  />
                </div>
                <div className="col-md-6 align-self-center">
                  <div className="col-md-10 my-5 my-md-0">
                    <h3 className="font-weight-bolder spysr-color mb-5 mt-1">
                      Fill Your Details To Get Beautiful Website For Your Business
                    </h3>
                    <div className="jsom-message-alert"></div>
                    <SignUpFormAgent user={{ email: '', firstName: '', lastName: '' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="section-white">
          {allSliderData &&
          allSliderData.allSliderData &&
          allSliderData.allSliderData.allWebSliderList ? (
            <AllSlider allSliderData={allSliderData.allSliderData}></AllSlider>
          ) : (
            ''
          )}
        </div>
        {/* {websiteContent != null && websiteContent.externalLink != 'free-website' ? (
           <DiscoveryFooterBanner></DiscoveryFooterBanner> 
        ) : (
          ''
        )} */}
        {/* <ServiceFooterBanner></ServiceFooterBanner> */}
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

  useEffect(() => {
    window.scrollTo(0, 0);
    if (true) {
      loadArticles();
    } else {
      loadArticles();
    }
  }, [loadArticles, true]);
  return (
    <div>
      {MetaTags.getAppMetaTags(seoDetail)}
      {renderWebsitePost()}
    </div>
  );
};

const mapStateToProps = (state, _ownProps) => {
  /* console.log('pulling state');
  console.log(state.websitePost); */
  return {
    websiteSetting: state.websiteSetting,
    
    websiteMenu: state.websiteMenu,
    websitePost: state.websitePost.websitePost
  };
};

const loadData = (store, param) => {
  return Promise.all([
    
    store.dispatch(fetchWebsiteMenuList()),
    store.dispatch(fetchWebsitePost(param)),
    store.dispatch(fetchWebsiteSetting())
  ]);
};

StaticPageHome.propTypes = {
  websitePost: PropTypes.objectOf(PropTypes.any),
  fetchWebsitePost: PropTypes.func,
  
  websiteMenu: PropTypes.objectOf(PropTypes.any),
  fetchWebsiteMenuList: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.any),
  websiteSetting: PropTypes.objectOf(PropTypes.any),
  fetchWebsiteSetting: PropTypes.func,
  match: PropTypes.objectOf(PropTypes.any)
};

StaticPageHome.defaultProps = {
  
  
  websiteMenu: null,
  fetchWebsiteMenuList: null,
  websitePost: null,
  fetchWebsitePost: null,
  location: null,
  websiteSetting: null,
  match: null
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onMountDispatch() {
    
    dispatch(fetchWebsiteMenuList());
    dispatch(fetchWebsitePost(param));
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
  component: connect(mapStateToProps, mapDispatchToProps, mergeProps)(StaticPageHome),
  loadData
};
