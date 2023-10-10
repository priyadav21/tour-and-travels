import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // ES6

import { fetchWebsiteMenuList } from '../actions/websiteMenu';
import { fetchWebsiteSetting } from '../actions/websiteMenu';
import MetaTags from '../Utils/metaTags';
import Header from '../components/desktop/Header';
import { getMenuMap } from '../Utils/util';
import Footer from '../Components/desktop/Footer';
import { Formik } from 'formik';

const AgentSignUpPage = props => {
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
        <div className="row no-gutters">
          <div className="col-md-6 d-none d-md-block">
            <img
              src="/img/bg-home4.jpg"
              className=""
              style={{ height: '100vh', width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6 align-self-center">
            <div className="row m-0">
              <div className="col"></div>
              <div className="col-md-10 my-5 my-md-0">
                <h2 className="font-weight-bolder spysr-color mb-5 mt-1">
                  Register Today for 10X Growth
                </h2>
                <div className="jsom-message-alert"></div>
                {/* <form onSubmit={this.handleSubmit}>
                <label>
                  {' '}
                  Person Name:
                  <input type="text" name="name"/>
                </label>
                <button type="submit"> Add </button>
              </form> */}

                <Formik
                  initialValues={{ name: 'yogesh' }}
                  onSubmit={(values, actions) => {
                    values.preventDefault();
                    console.log('submit!');
                    axios
                      .post(config.travelApiUrl + 'company-lead/create', {
                        appKey: config.apiKey,
                        city: values.name,
                        companyCategory: 'CA26',
                        companyName: values.name,
                        companyServiceType: 'Travel'
                      })
                      .then(response => {
                        // if (response.data.status.success)
                        // alert(response.data.status.message);
                        // setStatus(response.data.status.message);
                        setSubmitting(true);
                        resetForm();
                        // return <Redirect to="/free-website" />;
                        // else alert('We could not process your request , please try again later');
                      })
                      .catch(err => {
                        console.log(err);
                        setSubmitting(false);
                      });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }}
                >
                  {props => (
                    <form
                    /* onSubmit={e => {
                        e.preventDefault();
                        handleSubmit();
                      }} */
                    >
                      <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.name}
                        name="name"
                      />
                      {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                      <button type="submit" onClick={console.log('form will be submitted')}>
                        Submit
                      </button>
                    </form>
                  )}
                </Formik>
                {/* <SignUpFormAgent user={{ email: '', firstName: '', lastName: '' }} /> */}
              </div>
              <div className="col"></div>
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

AgentSignUpPage.propTypes = {
  websiteMenu: PropTypes.objectOf(PropTypes.any),
  websiteSetting: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),

  fetchWebsiteMenuList: PropTypes.func,
  fetchWebsiteSetting: PropTypes.func
};

AgentSignUpPage.defaultProps = {

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
  component: connect(mapStateToProps, mapDispatchToProps, mergeProps)(AgentSignUpPage),
  loadData
};
