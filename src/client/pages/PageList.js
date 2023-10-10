/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWebsiteCategoryList, fetchWebsitePostList } from '../actions';

import { fetchWebsiteMenuList } from '../actions/websiteMenu';
import { fetchWebsiteSetting } from '../actions/websiteMenu';
import MetaTags from '../Utils/metaTags';
import ShareButtonLink from './shareButtonLink';
import config from '../../../config';
import Header from '../components/desktop/Header';
import Footer from '../components/desktop/Footer';
import { getMenuMap, createSeoDetail } from '../Utils/util';
import SocialShare from '../Components/util/socialShare';

import AllPageListTheme from './pageTheme/PageListTemplateUtil';

const PageList = props => {
  /* const [websitePostList, setWebsitePostList] = useState(
    props.websitePostList != null && props.websitePostList ? props.websitePostList:null
  ); */

  const [websitePostList, setWebsitePostList] = useState(props.websitePostList.websitePostList);
  
  const [websiteMenu, setWebsiteMenu] = useState(props.websiteMenu);
  const [websiteSetting, setWebsiteSetting] = useState(props.websiteSetting);

  const [websiteCategoryList, setWebsiteCategoryList] = useState(props.websiteCategoryList);

  let webSocial = websiteSetting.websiteSetting.websiteSettingMain.websiteSettingSocial;
  let websiteSettingMain = websiteSetting.websiteSetting.websiteSettingMain;

  let websiteMenuMap = getMenuMap(websiteMenu.websiteMenu);
  const showContent = false;

  let seoDetail = websiteSetting.websiteSetting.websiteSettingMain.seoDetail;
  const seoDetailBlog = null;
  // const seoDetailBlog = websitePostList != null &&
  //     websitePostList.websitePostCategory != null &&
  //     websitePostList.websitePostCategory.seoDetail!=null
  //   ? websitePostList.websitePostCategory.seoDetail
  //     : null;

  const imageHeader = null;
  // const imageHeader =  websitePostList && websitePostList.websiteContentList != null &&
  //   websitePostList.websiteContentList[0].imageHeaderData != null
  //     ? websitePostList.websiteContentList[0].imageHeaderData
  //     : null;

  let pageConfig = {
    themeCode: config.pageListTheme,
    listType: 'pages',
    viewType: 'pages',
    
  };

  const metaTitle = seoDetailBlog && seoDetailBlog.title ? seoDetailBlog.title : null;
  const metaDesc =
    seoDetailBlog && seoDetailBlog.metaDescription ? seoDetailBlog.metaDescription : null;
  const keyword = seoDetailBlog && seoDetailBlog.metaKeyword ? seoDetailBlog.metaKeyword : null;
  const coverImg = imageHeader && imageHeader.imageURL ? imageHeader.imageURL : null;
  const path = `${config.webUrlNoSlash}`;

  seoDetail = createSeoDetail(seoDetail, metaTitle, keyword, metaDesc, path, coverImg);

  const { fetchWebsitePostList: loadArticles } = props;

  const renderWebsitePost = () => {
    return (
      <div>
        <Header
          websiteMenuLeft={websiteMenuMap.get('PRIMARY_LEFT')}
          websiteMenuRight={websiteMenuMap.get('PRIMARY_RIGHT')}
          websiteSetting={websiteSetting}
        />
       
        {websitePostList ? (
          <div className="section-white pb-0 mb-0">
            <AllPageListTheme
              websitePostList={websitePostList}
              websiteSetting={websiteSetting}
              websiteCategoryList={websiteCategoryList}
              pageConfig={pageConfig}
            ></AllPageListTheme>
          </div>
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
    console.log('I am scrolling');
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
  console.log(state.websitePostList); */
  return {
    websiteSetting: state.websiteSetting,
    
    websiteMenu: state.websiteMenu,
    websitePostList: state.websitePostList,
    websiteCategoryList: state.websiteCategoryList
  };
};

const loadData = (store, param) => {
  return Promise.all([
    
    store.dispatch(fetchWebsiteMenuList()),
    store.dispatch(fetchWebsitePostList(param, 'PAGE', 'LANDING_PAGE')),
    store.dispatch(fetchWebsiteCategoryList(param)),
    store.dispatch(fetchWebsiteSetting())
  ]);
};

PageList.propTypes = {
  websitePostList: PropTypes.objectOf(PropTypes.any),
  fetchWebsitePostList: PropTypes.func,
  
  websiteSetting: PropTypes.objectOf(PropTypes.any),
  fetchWebsiteSetting: PropTypes.func,
  websiteMenu: PropTypes.objectOf(PropTypes.any),
  fetchWebsiteMenuList: PropTypes.func,
  websiteCategoryList: PropTypes.objectOf(PropTypes.any),
  fetchWebsiteCategoryList: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any)
};

PageList.defaultProps = {
  
  
  websiteMenu: null,
  fetchWebsiteMenuList: null,
  websitePostList: null,
  fetchWebsitePostList: null,
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
    dispatch(fetchWebsitePostList(param));
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
  component: connect(mapStateToProps, mapDispatchToProps, mergeProps)(PageList),
  loadData
};
