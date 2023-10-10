/* eslint-disable no-underscore-dangle */
// Startup point for client-side application

import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { fromJS } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import reducers from './reducers';
import Routes from './Routes';
import { CookiesProvider } from 'react-cookie';
import configureStore from '././store/configureStoreTouroxy';
// import ClientCommons from './common';
// import Gen from './Utils/gen';

const state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

// Gen.sanitizeStore();
const preLoadedState = fromJS(window.__PRELOADED_STATE__); // eslint-disable-line no-underscore-dangle

const store = createStore(reducers, configureStore(preLoadedState), applyMiddleware(thunk));

/* setCurrentLocation = currentLocation => {
  ClientCommons.prevLocation = ClientCommons.currentLocation;
  ClientCommons.currentLocation = currentLocation;
}; */

 ReactDOM.hydrate(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter
         {...renderProps} 
        /* onUpdate={() => {
          ClientCommons.setCurrentLocation(browserHistory.getCurrentLocation());
          if (
            !ClientCommons.prevLocation ||
            ClientCommons.currentLocation.pathname !== ClientCommons.prevLocation.pathname
          ) {
            window.scrollTo(0, 0);
          }
        }} */
      />
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);

 /* ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
); */