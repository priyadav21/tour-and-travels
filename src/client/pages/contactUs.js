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
import { getMenuMap, createSeoDetail } from '../Utils/util';
import DiscoveryFooterBanner from './DiscoveryFooterBanner';
import ServiceFooterBanner from './ServiceFooterBanner';
import SubscribeBox from './SubscribeBox';

import Header from '../components/desktop/Header';
import Footer from '../Components/desktop/Footer';

const StaticPageHome = props => {
  const { websitePost, location, match } = props;
  
  const [websiteMenu, setWebsiteMenu] = useState(props.websiteMenu);
  const [websiteSetting, setWebsiteSetting] = useState(props.websiteSetting);
  let websiteMenuMap = getMenuMap(websiteMenu.websiteMenu);
  let websiteSettingMain = websiteSetting.websiteSetting.websiteSettingMain;
  let webSocial = websiteSetting.websiteSetting.websiteSettingMain.websiteSettingSocial;

  // console.log("check location "+props.location.pathname);

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
      <>
        <Header
          websiteMenuLeft={websiteMenuMap.get('PRIMARY_LEFT')}
          websiteMenuRight={websiteMenuMap.get('PRIMARY_RIGHT')}
          websiteSetting={websiteSetting}
        />
        {(websiteSection && websiteSection.title) ||
        (websiteSection && websiteSection.subTitle) ||
        coverImg ? (
          <div
            className={`section-parallax-staticPages ${
              websiteContent ? 'min-container-height' : ''
            }`}
            style={{
              backgroundImage: `url('${coverImg}`
            }}
          >
            {/*  {JSON.stringify(websiteSettingMain)} */}
            {(websiteSection && websiteSection.title) ||
            (websiteSection && websiteSection.subTitle) ? (
              <div className="parallax">
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
              websiteContent ? '' : 'margin-top-body'
            } `}
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
        
        <div className="hidden">
          <section className="contact-wrap section-white">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="contact-address">
                    <div className="contact-icon">
                      <i className="fa fa-map"></i>
                    </div>
                    <div className="contact-info">
                      <h5>Our Address</h5>
                      <p className="mb-0">{websiteSettingMain.address}</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="contact-address">
                    <div className="contact-icon">
                      <i className="fa fa-map"></i>
                    </div>
                    <div className="contact-info">
                      <h5>Contact</h5>
                      {websiteSettingMain.phone ? (
                        <p className="mb-0">
                          {websiteSettingMain.phoneLabel ? websiteSettingMain.phoneLabel : 'Phone'}
                          &nbsp;:&nbsp;
                          <a href={`tel:${websiteSettingMain.phone}`}>{websiteSettingMain.phone}</a>
                        </p>
                      ) : (
                        ''
                      )}
                      {websiteSettingMain.mobile ? (
                        <p className="mb-0">
                          {websiteSettingMain.mobileLabel
                            ? websiteSettingMain.mobileLabel
                            : 'Mobile'}
                          &nbsp;:&nbsp;
                          <a href={`tel:${websiteSettingMain.mobile}`}>
                            {websiteSettingMain.mobile}
                          </a>
                        </p>
                      ) : (
                        ''
                      )}
                      {websiteSettingMain.landline ? (
                        <p className="mb-0">
                          {websiteSettingMain.landlineLabel
                            ? websiteSettingMain.landlineLabel
                            : 'Landine'}
                          &nbsp;:&nbsp;
                          <a href={`tel:${websiteSettingMain.landline}`}>
                            {websiteSettingMain.landline}
                          </a>
                        </p>
                      ) : (
                        ''
                      )}
                      {websiteSettingMain.email1 ? (
                        <p className="mb-0">
                          {websiteSettingMain.emailLabel1
                            ? websiteSettingMain.emailLabel1
                            : 'Email'}
                          &nbsp;:&nbsp;
                          <a href={`mailto:${websiteSettingMain.email1}`}>
                            {websiteSettingMain.email1}
                          </a>
                        </p>
                      ) : (
                        ''
                      )}
                      {websiteSettingMain.email2 ? (
                        <p className="mb-0">
                          {websiteSettingMain.emailLabel2
                            ? websiteSettingMain.emailLabel2
                            : 'Email'}
                          &nbsp;:&nbsp;
                          <a href={`mailto:${websiteSettingMain.email1}`}>
                            {websiteSettingMain.email2}
                          </a>
                        </p>
                      ) : (
                        ''
                      )}
                      {websiteSettingMain.email3 ? (
                        <p className="mb-0">
                          {websiteSettingMain.emailLabel3
                            ? websiteSettingMain.emailLabel3
                            : 'Email'}
                          &nbsp;:&nbsp;
                          <a href={`mailto:${websiteSettingMain.email1}`}>
                            {websiteSettingMain.email3}
                          </a>
                        </p>
                      ) : (
                        ''
                      )}
                      {/* {webSocial.website ? <p className="mb-0">Website: <a href="/index-2/">{webSocial.website}</a></p> : ''} */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="contact-address">
                    <div className="contact-icon">
                      <i className="fa fa-share"></i>
                    </div>
                    <div className="contact-info">
                      <h5>Follow Us On</h5>
                      <ul className="social-profile v1">
                        <div>
                          {webSocial.facebook ? (
                            <a href={webSocial.facebook}>
                              <i className="fab fa-facebook-f" aria-hidden="true"></i>
                            </a>
                          ) : (
                            ''
                          )}
                          {webSocial.linkedin ? (
                            <a href={webSocial.linkedin}>
                              <i className="fab fa-linkedin" aria-hidden="true"></i>
                            </a>
                          ) : (
                            ''
                          )}
                          {webSocial.twitter ? (
                            <a href={webSocial.twitter}>
                              <i className="fab fa-twitter" aria-hidden="true"></i>
                            </a>
                          ) : (
                            ''
                          )}
                          {webSocial.instagram ? (
                            <a href={webSocial.instagram}>
                              <i className="fab fa-instagram" aria-hidden="true"></i>
                            </a>
                          ) : (
                            ''
                          )}
                          {webSocial.youtube ? (
                            <a href={webSocial.youtube}>
                              <i className="fab fa-youtube" aria-hidden="true"></i>
                            </a>
                          ) : (
                            ''
                          )}
                          {webSocial.pinterest ? (
                            <a href={webSocial.pinterest}>
                              <i className="fab fa-pinterest" aria-hidden="true"></i>
                            </a>
                          ) : (
                            ''
                          )}
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="contact-wrap section-white hidden">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="contact-form text-center">
                    <div className="style1 text-center mb-30">
                      <span>Contact Us</span>
                      <h2>Get In Touch</h2>
                    </div>
                    <a
                      data-toggle="modal"
                      data-target="#send-enquiry"
                      className="mb-4 btn spysr-btn px-3 py-2"
                      target="_blank"
                    >
                      Send Message Now
                      <i className="fas fa-arrow-right ml-2"></i>{' '}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {websiteSettingMain.googleMapLink ? (
            <section className="contact-wrap section-white">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="comp_map style2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: websiteSettingMain.googleMapLink
                            ? websiteSettingMain.googleMapLink
                            : ''
                        }}
                      ></div>
                      {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8385385572983!2d144.95358331584498!3d-37.81725074201705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4dd5a05d97%3A0x3e64f855a564844d!2s121%20King%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sbd!4v1612419490850!5m2!1sen!2sbd"></iframe> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            ''
          )}
        </div>
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
    store.dispatch(fetchAllSlider('contact-us')),
    store.dispatch(fetchWebsiteMenuList()),
    store.dispatch(fetchWebsitePost('contact-us')),
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
