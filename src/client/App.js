import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import ErrorBoundary from './components/desktop/ErrorBoundry';
import Header from './components/desktop/Header';
import Footer from './components/desktop/Footer';

const App = ({ route }) => {
  return (
    <div>
      {/* <Header /> */}
      {/* <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary> */}
      {renderRoutes(route.routes)}
      {/* <Footer /> */}
    </div>
  );
};

App.propTypes = {
  route: PropTypes.objectOf(PropTypes.any)
};

App.defaultProps = {
  route: null
};

export default {
  component: App
};
