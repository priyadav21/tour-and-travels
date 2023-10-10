import React, { useEffect, useState } from 'react';

function DestinationGrid(props) {

  return (
    <div className="container">
      <div className="section-white bg-transparent">
        <h3 className="caption font-weight-normal font-25 text-left mb-2">
          Best Deals &amp; Popular Destinations
        </h3>
        <hr className="section_header-divider" />

        <div className="col-md-12 p-0" id="slider3">
          <div className="row gallery mt-5">
            <div className="col-sm-6 col-md-3">
              <div
                className="img-container dark-bg border-radius-20"
                style={{ backgroundImage: 'url(img/s1.jpg)' }}
              >
                <div className="deal-link" data-toggle="modal" data-target="#send-enquiry">
                  <h3 className="hover-text">Dubai</h3>
                  <span className="btn-more">
                    <p className="hover-box-content text-dark text-center">
                      Dubai Tour Best Package
                    </p>{' '}
                    <br />
                    More Details <i className="fa fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div
                className="img-container dark-bg border-radius-20"
                style={{ backgroundImage: 'url(img/s2.jpg)' }}
              >
                <div className="deal-link" data-toggle="modal" data-target="#send-enquiry">
                  <h3 className="hover-text">Europe</h3>
                  <span className="btn-more">
                    <p className="hover-box-content text-dark text-center">
                      Europe Tour Best Package
                    </p>{' '}
                    <br />
                    More Details <i className="fa fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div
                className="img-container dark-bg border-radius-20"
                style={{ backgroundImage: 'url(img/s3.jpg)' }}
              >
                <div className="deal-link" data-toggle="modal" data-target="#send-enquiry">
                  <h3 className="hover-text">Kerala</h3>
                  <span className="btn-more">
                    <p className="hover-box-content text-dark text-center">
                      Kerala Tour Best Package
                    </p>{' '}
                    <br />
                    More Details <i className="fa fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div
                className="img-container dark-bg border-radius-20"
                style={{ backgroundImage: 'url(img/s4.jpg)' }}
              >
                <div className="deal-link" data-toggle="modal" data-target="#send-enquiry">
                  <h3 className="hover-text">Bangalore</h3>
                  <span className="btn-more">
                    <p className="hover-box-content text-dark text-center">
                      Bangalore Tour Best Package
                    </p>{' '}
                    <br />
                    More Details <i className="fa fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div
                className="img-container dark-bg border-radius-20"
                style={{ backgroundImage: 'url(img/a1.jpg)' }}
              >
                <div className="deal-link" data-toggle="modal" data-target="#send-enquiry">
                  <h3 className="hover-text">Ladakh</h3>
                  <span className="btn-more">
                    <p className="hover-box-content text-dark text-center">
                      Ladakh Tour Best Package
                    </p>{' '}
                    <br />
                    More Details <i className="fa fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div
                className="img-container dark-bg border-radius-20"
                style={{ backgroundImage: 'url(img/a2.jpg)' }}
              >
                <div className="deal-link" data-toggle="modal" data-target="#send-enquiry">
                  <h3 className="hover-text">Taj Mahal</h3>
                  <span className="btn-more">
                    <p className="hover-box-content text-dark text-center">
                      Taj Mahal Tour Best Package
                    </p>{' '}
                    <br />
                    More Details <i className="fa fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div
                className="img-container dark-bg border-radius-20"
                style={{ backgroundImage: 'url(img/a3.jpg)' }}
              >
                <div className="deal-link" data-toggle="modal" data-target="#send-enquiry">
                  <h3 className="hover-text">Bali</h3>
                  <span className="btn-more">
                    <p className="hover-box-content text-dark text-center">
                      Bali Tour Best Package
                    </p>{' '}
                    <br />
                    More Details <i className="fa fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div
                className="img-container dark-bg border-radius-20"
                style={{ backgroundImage: 'url(img/a4.jpg)' }}
              >
                <div className="deal-link" data-toggle="modal" data-target="#send-enquiry">
                  <h3 className="hover-text">Mumbai</h3>
                  <span className="btn-more">
                    <p className="hover-box-content text-dark text-center">
                      Mumbai Tour Best Package
                    </p>{' '}
                    <br />
                    More Details <i className="fa fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div
                className="img-container dark-bg border-radius-20"
                style={{ backgroundImage: 'url(img/a5.jpg)' }}
              >
                <div className="deal-link" data-toggle="modal" data-target="#send-enquiry">
                  <h3 className="hover-text">Rajasthan</h3>
                  <span className="btn-more">
                    {' '}
                    <p className="hover-box-content text-dark text-center">
                      Rajasthan Tour Best Package
                    </p>{' '}
                    <br />
                    More Details <i className="fa fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div
                className="img-container dark-bg border-radius-20"
                style={{ backgroundImage: 'url(img/a6.jpg)' }}
              >
                <div className="deal-link" data-toggle="modal" data-target="#send-enquiry">
                  <h3 className="hover-text">Kolkatta</h3>
                  <span className="btn-more">
                    <p className="hover-box-content text-dark text-center">
                      Kolkatta Tour Best Package
                    </p>{' '}
                    <br />
                    More Details <i className="fa fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div
                className="img-container dark-bg border-radius-20"
                style={{ backgroundImage: 'url(img/a7.jpg)' }}
              >
                <div className="deal-link" data-toggle="modal" data-target="#send-enquiry">
                  <h3 className="hover-text">Paris</h3>
                  <span className="btn-more">
                    <p className="hover-box-content text-dark text-center">
                      Paris Tour Best Package
                    </p>{' '}
                    <br />
                    More Details <i className="fa fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div
                className="img-container dark-bg border-radius-20"
                style={{ backgroundImage: 'url(img/a8.jpg)' }}
              >
                <div className="deal-link" data-toggle="modal" data-target="#send-enquiry">
                  <h3 className="hover-text">Thailand</h3>
                  <span className="btn-more">
                    <p className="hover-box-content text-dark text-center">
                      Thailand Tour Best Package
                    </p>{' '}
                    <br />
                    More Details <i className="fa fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DestinationGrid;