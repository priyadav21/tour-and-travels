import React from 'react';
import PropTypes from 'prop-types';

const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return (
    <div className="ui container">
      <div className="section-white">
        <div className="container mt-5">
          <div className="text-center">
            <h2>You are a real Explorer !!....</h2>
            <p className="font-20 mb-0">
              You found something , Which nobody could do. We at Yujik believe in making your every
              experience awesome
            </p>
            <p className="font-20">
              Search from thousands of thousands templates from Yujik Today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

NotFoundPage.propTypes = {
  staticContext: PropTypes.objectOf(PropTypes.any)
};

NotFoundPage.defaultProps = {
  staticContext: {}
};

export default {
  component: NotFoundPage
};
