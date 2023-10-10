import React, { useEffect, useState } from 'react';

function ReviewCarousel(props) {

  return (
    <div className="section-white py-4">
      <div className="container">
        <h3 className="caption font-weight-normal font-25 text-left mb-2">Testimonials</h3>
        <hr className="section_header-divider" />
        <ul
          className="nav nav-pills mt-4 text-center"
          id="pills-tab"
          role="tablist"
          style={{
            overflow: 'scroll',
            width: '100%',
            padding: '2px 0',
            display: 'inline-flex',
            overflowX: 'scroll',
            whiteSpace: 'nowrap',
            flexWrap: 'inherit'
          }}
        >
          <li className="nav-item mb-2">
            <a
              className="nav-link active"
              id="pills-home-tab"
              data-toggle="pill"
              href="#pills-home1"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Sulabh's Adorable Seychelles Family Getaway
            </a>
          </li>
          <li className="nav-item mb-2">
            <a
              className="nav-link"
              id="pills-home-tab"
              data-toggle="pill"
              href="#pills-home"
              role="tab"
              aria-controls="pills-home"
              aria-selected="false"
            >
              Kanav's Singapore Bali honeymoon
            </a>
          </li>
          <li className="nav-item mb-2">
            <a
              className="nav-link"
              id="pills-profile-tab"
              data-toggle="pill"
              href="#pills-profile"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Adventurous Honeymoon In Maldives
            </a>
          </li>
          <li className="nav-item mb-2">
            <a
              className="nav-link"
              id="pills-contact-tab"
              data-toggle="pill"
              href="#pills-contact"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Akash's luxurious honeymoon
            </a>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home1"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="row mt-4">
              <div className="col-md-5">
                <div className="carousel-wrap">
                  <div className="owl-carousel owl-carousel-testimonals  text-white">
                    <div className="tabsmenus m-auto">
                      <img
                        className="img-fluid"
                        src="img/trip1.jpg"
                        title="Touroxy corporate testimonials"
                        alt="Touroxy corporate testimonials"
                      />
                    </div>
                    <div className="tabsmenus m-auto">
                      <img
                        className="img-fluid"
                        src="img/trip1.jpg"
                        title="Touroxy corporate testimonials"
                        alt="Touroxy corporate testimonials"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7 align-self-center">
                <p className="font-25 font-weight-bold text-dark">
                  <span>Sulabh's Adorable Seychelles Family Getaway</span>
                </p>
                <p className="text-muted text-left">
                  Sulabh and his adorable family had the most refreshing holiday experience in
                  Seychelles. From scaling breathtaking beaches to hiking amid lush greens, here's
                  what they did on their leisurely vacation.
                </p>
                <a href="#!" className="btn btn-no-color px-4">
                  Get Quotes for this Package
                </a>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="row mt-4">
              <div className="col-md-5">
                <div className="carousel-wrap">
                  <div className="owl-carousel owl-carousel-testimonals  text-white">
                    <div className="tabsmenus m-auto">
                      <img
                        className="img-fluid"
                        src="img/trip1.jpg"
                        title="Touroxy corporate testimonials"
                        alt="Touroxy corporate testimonials"
                      />
                    </div>
                    <div className="tabsmenus m-auto">
                      <img
                        className="img-fluid"
                        src="img/trip1.jpg"
                        title="Touroxy corporate testimonials"
                        alt="Touroxy corporate testimonials"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7 align-self-center">
                <p className="font-25 font-weight-bold text-dark">
                  <span>Sulabh's Adorable Seychelles Family Getaway</span>
                </p>
                <p className="text-muted text-left">
                  Sulabh and his adorable family had the most refreshing holiday experience in
                  Seychelles. From scaling breathtaking beaches to hiking amid lush greens, here's
                  what they did on their leisurely vacation.
                </p>
                <a href="#!" className="btn btn-no-color px-4">
                  Get Quotes for this Package
                </a>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div className="row mt-4">
              <div className="col-md-5">
                <div className="carousel-wrap">
                  <div className="owl-carousel owl-carousel-testimonals  text-white">
                    <div className="tabsmenus m-auto">
                      <img
                        className="img-fluid"
                        src="img/trip1.jpg"
                        title="Touroxy corporate testimonials"
                        alt="Touroxy corporate testimonials"
                      />
                    </div>
                    <div className="tabsmenus m-auto">
                      <img
                        className="img-fluid"
                        src="img/trip1.jpg"
                        title="Touroxy corporate testimonials"
                        alt="Touroxy corporate testimonials"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7 align-self-center">
                <p className="font-25 font-weight-bold text-dark">
                  <span>Sulabh's Adorable Seychelles Family Getaway</span>
                </p>
                <p className="text-muted text-left">
                  Sulabh and his adorable family had the most refreshing holiday experience in
                  Seychelles. From scaling breathtaking beaches to hiking amid lush greens, here's
                  what they did on their leisurely vacation.
                </p>
                <a href="#!" className="btn btn-no-color px-4">
                  Get Quotes for this Package
                </a>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          >
            <div className="row mt-4">
              <div className="col-md-5">
                <div className="carousel-wrap">
                  <div className="owl-carousel owl-carousel-testimonals  text-white">
                    <div className="tabsmenus m-auto">
                      <img
                        className="img-fluid"
                        src="img/trip1.jpg"
                        title="Touroxy corporate testimonials"
                        alt="Touroxy corporate testimonials"
                      />
                    </div>
                    <div className="tabsmenus m-auto">
                      <img
                        className="img-fluid"
                        src="img/trip1.jpg"
                        title="Touroxy corporate testimonials"
                        alt="Touroxy corporate testimonials"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7 align-self-center">
                <p className="font-25 font-weight-bold text-dark">
                  <span>Sulabh's Adorable Seychelles Family Getaway</span>
                </p>
                <p className="text-muted text-left">
                  Sulabh and his adorable family had the most refreshing holiday experience in
                  Seychelles. From scaling breathtaking beaches to hiking amid lush greens, here's
                  what they did on their leisurely vacation.
                </p>
                <a href="#!" className="btn btn-no-color px-4">
                  Get Quotes for this Package
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReviewCarousel;