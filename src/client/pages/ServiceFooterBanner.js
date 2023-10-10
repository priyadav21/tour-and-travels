import React, { useEffect, useState } from 'react';

function ServiceFooterBanner(props) {

  return (
    <div className="section-white pt-0 pb-0">
          <div className="container">
            <div
              className="col-md-12  py-5 px-4 border-radius-25"
              style={{
                background: 'linear-gradient(45deg, #3F51B5, #000000)',
                boxShadow:
                  '0 1.5rem 3rem -0.7rem rgba(62, 83, 181, 0.65);transform: translateY(60px)'
              }}
            >
              <div className="">
                <div className="col-md-12 mt-5 mt-md-0">
                  <div className="row">
                    <div className="col-md-3 text-center">
                      <div className="text-white">
                        <img src="/img/svg/travel.svg" className="mb-4" width="100px" />
                        <p className="font-weight-bold mb-0 font-25">1 Lakh+</p>
                        <p className="font-14">Travelers monthly visiting us</p>
                      </div>
                    </div>
                    <div className="col-md-3 text-center">
                      <div className="text-white">
                        <img src="img/svg/verified-account.svg" className="mb-4" width="100px" />
                        <p className="font-weight-bold mb-0 font-25">65+</p>
                        <p className="font-14">Destinations served worldwide</p>
                      </div>
                    </div>
                    <div className="col-md-3 text-center">
                      <div className="text-white">
                        <img src="/img/svg/map.svg" className="mb-4" width="100px" />
                        <p className="font-weight-bold mb-0 font-25">650+</p>
                        <p className="font-14">
                          <span>Network of expert travel agents</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-3 text-center">
                      <div className="text-white">
                        <img src="img/svg/couple.svg" className="mb-4" width="100px" />
                        <p className="font-weight-bold mb-0 font-25">97%</p>
                        <p className="font-14">
                          <span>Positive quotient by travelers</span>
                        </p>
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
export default ServiceFooterBanner;