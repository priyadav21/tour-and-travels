import React, { useEffect, useState } from 'react';

function MarketPlaceBanner(props) {

  return (
    <div className="section-white d-md-block d-none">
      <div className="container">
        <div className="col-md-12">
          <div className="" style={{ zoom: '0.95' }}>
            <div className="row">
              <div className="col-md-6">
                <h3 className="caption font-weight-normal font-25 text-center mb-5 text-dark">
                  Largest Holiday Marketplace
                </h3>
                <div className="row">
                  <div className="col-md-4 text-center text-dark">
                    <i className="fas fa-user-check h1 text-warning"></i>
                    <p className="font-weight-bold font-16 mb-0">100+</p>
                    <p className="f14 fw4 m0">Verified Agents</p>
                  </div>

                  <div className="col-md-4 text-center text-dark">
                    <i className="fas fa-users h1 text-warning"></i>
                    <p className="font-weight-bold font-16 mb-0">22 Hundred+</p>
                    <p className="f14 fw4 m0">Happy Travellers</p>
                  </div>

                  <div className="col-md-4 text-center text-dark">
                    <i className="fas fa-map h1 text-warning"></i>
                    <p className="font-weight-bold font-16 mb-0">65+</p>
                    <p className="f14 fw4 m0">Destinations</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 border-left">
                <h3 className="caption font-weight-normal font-25 text-center mb-5 text-dark">
                  Largest Holiday Marketplace
                </h3>
                <div className="row">
                  <div className="col-md-4 text-center text-dark">
                    <i className="fas fa-thumbs-up h1 text-warning"></i>
                    <p className="font-weight-bold font-16 mb-0">TourOxy</p>
                    <p className="f14 fw4 m0">Verified</p>
                  </div>

                  <div className="col-md-4 text-center text-dark">
                    <i className="fas fa-book-open h1 text-warning"></i>
                    <p className="font-weight-bold font-16 mb-0">Stringent</p>
                    <p className="f14 fw4 m0">Quality Control</p>
                  </div>

                  <div className="col-md-4 text-center text-dark">
                    <i className="fas fa-headphones h1 text-warning"></i>
                    <p className="font-weight-bold font-16 mb-0">24/7</p>
                    <p className="f14 fw4 m0">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MarketPlaceBanner;