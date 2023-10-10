/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

const HomePageBanner = () => {
   
  const [menuOpen, setMenuToggle] = useState(false);
  const toggleMenu = () => setMenuToggle(!menuOpen);

  const stylesOpen = {
    transform: 'translateX(0px)'
  };
  
  return (
    /* <!--Slider Section Start--> */
    <div className="form-container">
      <div className="parallax-home">
        <div className="">
          <div className="row m-0 d-md-flex d-none">
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <h1 className="font-3rem font-weight-bolder mb-0 text-white"> Explore </h1>
              <h4 className="font-3rem font-weight-light text-white"> your amazing city </h4>
            </div>
          </div>
          {/* <div
            className="text-center pt-4 pb-4 mb-4 w-100 d-md-flex d-none"
            style={{ zIndex: '2', width: '100%' }}
          >
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="bg-white border p-2 shadow">
                <form action="tour-list" className="form-horizontal" id="tour-form">
                  <div className="row">
                    <div className="col-md-12">
                      <select
                        className="selectpicker show-tick form-control rounded-0 search-input required"
                        name="category-group"
                        id="category-group"
                        data-live-search="true"
                      >
                        <option value="">Select your Tour</option>
                      </select>
                    </div>
                    <div className="">
                      <a className="font-weight-bolder search-btn">
                        <i className="material-icons font-3rem">search</i>{' '}
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div> */}
        </div>
      </div>

      {/* <!-- mobile view search box start--> */}

      <div className="d-md-none d-block">
        <input
          type="text"
          placeholder="Search Destination"
          className="form-control mobile-search-box sidebar-bottom"
          style={{
            boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.20) !important',
            height: '50px',
            marginTop: '-50px'
          }}
        />
        <i className="fa fa-search mobile-search-box-icon sidebar"></i>
      </div>

      {/* <!--sidebar bottom start--> */}

      <div className="sidebarupdown-bottom"></div>
      <div className="sidebar-show-bottom" style={{ top: '100%' }}>
        <div className="sliderbgclass">
          <button id="sidebar-close-btn-bottom" type="button" className="close" aria-label="Close">
            {/* <svg width="14" height="14">
                        <use xlink:href="#close-pupup"><svg id="close-pupup" viewBox="0 0 14 14" width="100%" height="100%">
                                <path fill="#242B2E" fill-rule="evenodd" d="M8.203 7l5.528-5.446a.961.961 0 0 0 .067-1.255.745.745 0 0 0-1.13-.075L7 5.811 1.332.224A.745.745 0 0 0 .202.3.958.958 0 0 0 .27 1.554L5.797 7 .27 12.446a.961.961 0 0 0-.068 1.255.767.767 0 0 0 .599.299.754.754 0 0 0 .53-.224l5.67-5.587 5.668 5.587a.75.75 0 0 0 .53.224c.222 0 .44-.101.6-.299a.96.96 0 0 0-.068-1.255L8.203 7z" opacity=".54"></path>
                            </svg>
                        </use>
                    </svg> */}
          </button>
          <div className="">
            <p className="caption pt-4 pl-3 mt-0 font-weight-bolder"> Search Destination </p>
          </div>

          <form action="tour-list" className="col-md-12 p-3 ml-0" id="tour-form">
            <div className="row">
              <div className="col-md-12 pb-0">
                <select
                  className="selectpicker show-tick form-control mb-3 required"
                  name="category-group"
                  id="category-group"
                  data-live-search="true"
                >
                  <option value="">Select your Tour</option>
                </select>
                <i
                  className="fa fa-map-marker-alt search-box-icon"
                  style={{ marginRight: '4px', top: '10px', background: 'white', padding: '5px' }}
                ></i>
              </div>

              <div className="col-md-12 pb-0">
                <button type="submit" className="btn btn-no-color btn-block btn-lg text-black">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <!--sidebar bottom end--> */}
      {/* <!-- mobile view search box END--> */}
      {/* <img
        src="img/rh-cover.png"
        className="img-fluid d-none d-lg-inline"
        style={{ marginTop: '-80px' }}
      /> */}
    </div>
  );
};

export default HomePageBanner;
