import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWebsiteCategoryList, fetchWebsitePost } from '../actions';


import { fetchWebsiteMenuList, fetchWebsiteSetting } from '../actions/websiteMenu';
import MetaTags from '../Utils/metaTags';
import ShareButtonLink from './shareButtonLink';
import config from '../../../config';
import Footer from '../components/desktop/Footer';
import { getMenuMap, createSeoDetail } from '../Utils/util';

import AllPageViewTheme from './pageTheme/PageViewTemplateUtil';
import Header from '../components/desktop/Header';

const PageView = props => {
  // const { websitePost, location, match } = props;
  
  const [websiteMenu, setWebsiteMenu] = useState(props.websiteMenu);
  const [websiteSetting, setWebsiteSetting] = useState(props.websiteSetting);
  const [websiteCategoryList, setWebsiteCategoryList] = useState(props.websiteCategoryList);

  const [websitePost, setWebsitePost] = useState(props.websitePost);

  let websiteSettingMain = websiteSetting.websiteSetting.websiteSettingMain;
  let webtheme =
    websiteSettingMain && websiteSettingMain.websiteSettingTh
      ? websiteSettingMain.websiteSettingTh
      : null;

  let websiteMenuMap = getMenuMap(websiteMenu.websiteMenu);
  let seoDetail = websiteSetting.websiteSetting.websiteSettingMain.seoDetail;

  const { fetchWebsitePost: loadArticles } = props;

  const [websiteContent, setWebsiteContent] = useState(
    props.websitePost != null &&
      props.websitePost.websiteContent != null &&
      props.websitePost.websiteContent
      ? props.websitePost.websiteContent
      : null
  );
  const [nextPost, setNextPost] = useState(
    props.websitePost != null && props.websitePost.nextPost != null && props.websitePost.nextPost
      ? props.websitePost.nextPost
      : null
  );

  const [prevPost, setPrevPost] = useState(
    props.websitePost != null && props.websitePost.prevPost != null && props.websitePost.prevPost
      ? props.websitePost.prevPost
      : null
  );

  const [viewShareCount, setViewShareCount] = useState(
    props.websitePost != null &&
      props.websitePost.websiteContent != null &&
      props.websitePost.websiteContent.viewShareCount != null &&
      props.websitePost.websiteContent.viewShareCount
      ? props.websitePost.websiteContent.viewShareCount
      : null
  );
  const [websiteSection, setWebsiteSection] = useState(
    props.websitePost != null &&
      props.websitePost.websiteContent != null &&
      props.websitePost.websiteContent.websiteSection
      ? props.websitePost.websiteContent.websiteSection
      : null
  );
  const [seoDetailBlog, setSeoDetailBlog] = useState(
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

  let pageConfig = {
    themeCode: config.pageViewTheme,
    listType: 'pages',
    viewType: 'pages',
    
  };
  const metaTitle = seoDetailBlog && seoDetailBlog.title ? seoDetailBlog.title : null;
  const metaDesc =
    seoDetailBlog && seoDetailBlog.metaDescription ? seoDetailBlog.metaDescription : null;
  const keyword = seoDetailBlog && seoDetailBlog.metaKeyword ? seoDetailBlog.metaKeyword : null;
  const coverImg = imageHeader && imageHeader.imageURL ? imageHeader.imageURL : null;
  const path = `${config.webUrlNoSlash}/pages/${
    websiteContent != null && websiteContent.externalLink != null ? websiteContent.externalLink : ''
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
        <div
          className={`${
            webtheme.headerTemplate != 'STYLE_1'
              ? 'section-white-padding-less'
              : 'section-white-padding-less'
          }  `}
        >
          <AllPageViewTheme
            websitePost={websitePost}
            websiteSetting={websiteSetting}
            websiteCategoryList={websiteCategoryList}
            allSliderData={allSliderData}
            pageConfig={pageConfig}
          ></AllPageViewTheme>
        </div>
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
    websitePost: state.websitePost.websitePost,
    websiteCategoryList: state.websiteCategoryList
  };
};

const loadData = (store, param) => {
  return Promise.all([
    
    store.dispatch(fetchWebsiteMenuList()),
    store.dispatch(fetchWebsitePost(param)),
    store.dispatch(fetchWebsiteCategoryList(param)),
    store.dispatch(fetchWebsiteSetting())
  ]);
};

PageView.propTypes = {
  websitePost: PropTypes.objectOf(PropTypes.any),
  fetchWebsitePost: PropTypes.func,
  
  websiteMenu: PropTypes.objectOf(PropTypes.any),
  fetchWebsiteMenuList: PropTypes.func,
  websiteSetting: PropTypes.objectOf(PropTypes.any),
  fetchWebsiteSetting: PropTypes.func,
  websiteCategoryList: PropTypes.objectOf(PropTypes.any),
  fetchWebsiteCategoryList: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any)
};

PageView.defaultProps = {
  
  
  websiteMenu: null,
  fetchWebsiteMenuList: null,
  websitePost: null,
  fetchWebsitePost: null,
  websiteSetting: null,
  fetchWebsiteSetting: null,
  websiteCategoryList: null,
  fetchWebsiteCategoryList: null,
  location: null,
  match: null
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onMountDispatch() {
    
    dispatch(fetchWebsiteMenuList());
    dispatch(fetchWebsitePost(param));
    dispatch(fetchWebsiteCategoryList(param));
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
  component: connect(mapStateToProps, mapDispatchToProps, mergeProps)(PageView),
  loadData
};
