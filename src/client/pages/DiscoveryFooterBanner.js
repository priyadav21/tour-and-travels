import React, { useEffect, useState } from 'react';

function DiscoveryFooterBanner(props) {

  return (
    <div className="section-white py-0">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="shadow-lg bg-white p-3 border-radius-15 mb-4">
              <i className="fa fa-camera-retro font-25 text-primary mb-4" aria-hidden="true"></i>
              <h5 className="font-weight-bold">Discovery</h5>
              <p className="font-16 text-muted">
                Our team explores the best opportunities available. They handpick the most unique,
                unknown &amp; also local experiences from authentic operators.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="shadow-lg bg-white p-3 border-radius-15 mb-4">
              <i className="fa fa-ship font-25 text-primary mb-4" aria-hidden="true"></i>
              <h5 className="font-weight-bold">Bookability</h5>
              <p className="font-16 text-muted">
                Our team explores the best opportunities available. They handpick the most unique,
                unknown &amp; also local experiences from authentic operators.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="shadow-lg bg-white p-3 border-radius-15 mb-4">
              <i className="fa fa-taxi font-25 text-primary mb-4" aria-hidden="true"></i>
              <h5 className="font-weight-bold">Delightful Customer Experience</h5>
              <p className="font-16 text-muted">
                Our team explores the best opportunities available. They handpick the most unique,
                unknown &amp; also local experiences from authentic operators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DiscoveryFooterBanner;