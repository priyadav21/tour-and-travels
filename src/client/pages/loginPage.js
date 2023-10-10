import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // ES6

import { fetchWebsiteMenuList } from '../actions/websiteMenu';
import { fetchWebsiteSetting } from '../actions/websiteMenu';
import MetaTags from '../Utils/metaTags';
import Header from '../components/desktop/Header';
import { getMenuMap } from '../Utils/util';
import Footer from '../Components/desktop/Footer';

const LoginPage = props => {
  const [websiteSetting, setWebsiteSetting] = useState(props.websiteSetting);
  const [websiteMenu, setWebsiteMenu] = useState(props.websiteMenu);

  let websiteMenuMap = getMenuMap(websiteMenu.websiteMenu);
  let websiteSettingMain = websiteSetting.websiteSetting.websiteSettingMain;
  let seoDetail = websiteSetting.websiteSetting.websiteSettingMain.seoDetail;

  const renderArticles = () => {
    return (
      <>
        <Header
          websiteMenuLeft={websiteMenuMap.get('PRIMARY_LEFT')}
          websiteMenuRight={websiteMenuMap.get('PRIMARY_RIGHT')}
          websiteSetting={websiteSetting}
          pageType="HOME"
        />
        <div key={Math.random()}>
          <div className="row no-gutters">
            <div className="col-md-6 d-none d-md-block">
              <img
                src="/img/bg-home2.jpeg"
                className=""
                style={{ height: '100vh', width: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-6 align-self-center">
              <div className="row m-0">
                <div className="col"></div>
                <div className="col-md-7 my-5 my-md-0">
                  <form className="">
                    <div className="travel-mail text-left mb-4">
                      <h2 className="font-weight-bolder spysr-color">Log In</h2>
                      <div className="jsom-message-alert"></div>
                    </div>
                    <div className="form-group">
                      <label className="my-lbl">Your Email/Mobile</label>
                      <input
                        className="form-control my-fc"
                        name="email"
                        type="email"
                        placeholder=""
                        id=""
                        required="required"
                      />
                    </div>
                    <div className="form-group">
                      <label className="my-lbl">Your Password</label>
                      <input
                        className="form-control my-fc"
                        name="password"
                        type="password"
                        placeholder=""
                        id=""
                        required="required"
                      />
                    </div>
                    <a href="forgot-password" className="text-gray font-14">
                      Forgot Password
                    </a>
                    <button
                      type="submit"
                      id="enquiry-btn"
                      className="btn btn-no-color btn-block text-black py-3 mt-4"
                    >
                      Log In
                    </button>
                  </form>
                  <div className="text-center mt-4">
                    <a id="sign-up-text" className="text-muted font-14" href="/register" target="_self">
                      Don't have an account? Sign up
                    </a>
                  </div>
                </div>
                <div className="col"></div>
              </div>
            </div>
          </div>
        </div>
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

LoginPage.propTypes = {
  websiteMenu: PropTypes.objectOf(PropTypes.any),
  websiteSetting: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),

  fetchWebsiteMenuList: PropTypes.func,
  fetchWebsiteSetting: PropTypes.func
};

LoginPage.defaultProps = {

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
  component: connect(mapStateToProps, mapDispatchToProps, mergeProps)(LoginPage),
  loadData
};
