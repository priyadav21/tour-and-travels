import React, { useEffect, useState } from 'react';

function HowTourWork(props) {

  return (
      <div className="section-white py-4">
        <div className="container">
          <div
            className="col-md-12  py-5 px-4 border-radius-25"
            style={{
              background: 'linear-gradient(45deg, #ff68d2, #ffde00)',
              boxShadow: '0 1.5rem 3rem -0.7rem rgba(255, 153, 131, 0.80)'
            }}
          >
            <div className="" style={{ zoom: '0.95' }}>
              <h3 className="caption font-weight-normal font-25 text-left mb-2">
                Browse packages through holiday THEMES
              </h3>
              <hr className="section_header-divider" />

              <div className="owl-carousel owl-carousel-icon owl-theme mt-5">
                <div className="item" data-toggle="modal" data-target="#send-enquiry">
                  <div className="grid3">
                    <figure className="effect-marley3">
                      <figcaption>
                        <img className="clippy" src="img/svg/hiker.svg" />
                        <h2>
                          Adventure
                          <small className="d-none d-md-block">
                            <br /> 183 + Packages{' '}
                          </small>
                        </h2>
                      </figcaption>
                    </figure>
                  </div>
                </div>
                <div className="item" data-toggle="modal" data-target="#send-enquiry">
                  <div className="grid3">
                    <figure className="effect-marley3">
                      <figcaption>
                        <img className="clippy" src="img/svg/island.svg" />
                        <h2>
                          Nature
                          <small className="d-none d-md-block">
                            <br /> 125 + Packages
                          </small>
                        </h2>
                      </figcaption>
                    </figure>
                  </div>
                </div>
                <div className="item" data-toggle="modal" data-target="#send-enquiry">
                  <div className="grid3">
                    <figure className="effect-marley3">
                      <figcaption>
                        <img className="clippy" src="img/svg/goal.svg" />
                        <h2>
                          Hill Station{' '}
                          <small className="d-none d-md-block">
                            <br /> 80 + Packages
                          </small>
                        </h2>
                      </figcaption>
                    </figure>
                  </div>
                </div>
                <div className="item" data-toggle="modal" data-target="#send-enquiry">
                  <div className="grid3">
                    <figure className="effect-marley3">
                      <figcaption>
                        <img
                          className="clippy"
                          src="img/svg/temple.svg"
                          style={{
                            padding: '10px',
                            background: '#56373a',
                            borderRadius: '100px'
                          }}
                        />
                        <h2>
                          Religious
                          <small className="d-none d-md-block">
                            <br /> 12 + Packages{' '}
                          </small>
                        </h2>
                      </figcaption>
                    </figure>
                  </div>
                </div>
                <div className="item" data-toggle="modal" data-target="#send-enquiry">
                  <div className="grid3">
                    <figure className="effect-marley3">
                      <figcaption>
                        <img className="clippy" src="img/svg/rafting.svg" />
                        <h2>
                          Water Activities
                          <small className="d-none d-md-block">
                            <br /> 200 + Packages{' '}
                          </small>
                        </h2>
                      </figcaption>
                    </figure>
                  </div>
                </div>
                <div className="item" data-toggle="modal" data-target="#send-enquiry">
                  <div className="grid3">
                    <figure className="effect-marley3">
                      <figcaption>
                        <img className="clippy" src="img/svg/yoga.svg" />
                        <h2>
                          Yoga
                          <small className="d-none d-md-block">
                            <br /> 104 + Packages{' '}
                          </small>
                        </h2>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-white py-4">
          <div className="container">
            <div
              className="col-md-12  py-5 px-4 border-radius-25"
              style={{
                background: 'linear-gradient(45deg, #3F51B5, #000000)',
                boxShadow: '0 1.5rem 3rem -0.7rem rgba(62, 83, 181, 0.65)'
              }}
            >
              <div className="" style={{ zoom: '0.95' }}>
                <h3 className="caption font-weight-normal font-25 text-left mb-2 text-white">
                  How it works
                </h3>
                <hr className="section_header-divider" />

                <div className="row mt-5">
                  <div className="col-md-4">
                    <p className="font-18 text-white mt-3 mb-0">Customize &amp; Book</p>
                    <p className="font-2rem font-weight-bold text-white mb-0">
                      <span>
                        Amazing
                        <br />
                        Holiday Packages
                      </span>
                    </p>
                    <p className="text-white">
                      in{' '}
                      <span className="text-no-color font-18 font-weight-bold">3 Simple Steps</span>
                    </p>
                  </div>
                  <div className="col-md-8 mt-5 mt-md-0">
                    <div className="row">
                      <div className="col-md-4 text-center">
                        <div className="text-white">
                          <img src="img/svg/click.svg" className="mb-4" width="100px" />
                          <p className="font-weight-bold mb-0 font-18">Select your package</p>
                          <p className="">&amp; tell us your preferences</p>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className="text-white">
                          <img src="img/svg/verified-account.svg" className="mb-4" width="100px" />
                          <p className="font-weight-bold mb-0 font-18">Get multiple free quotes</p>
                          <p className="">from verified travel experts</p>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className="text-white">
                          <img src="img/svg/travel.svg" className="mb-4" width="100px" />
                          <p className="font-weight-bold mb-0 font-18">Customize &amp; book</p>
                          <p className="">
                            <span>a perfect holiday experience</span>
                          </p>
                        </div>
                      </div>
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
export default HowTourWork;