import React, { useEffect, useState } from 'react';

function PopularDestCarousel(props) {

  return (
    <div className="container">
      <div className="section-white bg-transparent">
        <h3 className="caption font-weight-normal font-25 text-left mb-2">
          Popular Destination Across The World
        </h3>
        <hr className="section_header-divider" />
        <div className="owl-carousel owl-theme owl-loaded owl-drag mt-5" id="slider1">
          <div className="item" data-toggle="modal" data-target="#send-enquiry">
            <div className="grid">
              <figure className="effect-marley">
                <img className="img-fluid" src="img/a10.jpg" />
                <figcaption>
                  <h2>
                    New Delhi
                    <span>
                      {' '}
                      <br /> 280 + Listing{' '}
                    </span>
                  </h2>
                  <p>
                    <a className="text-white">Explore</a>
                  </p>
                  <a href="">View more</a>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="item" data-toggle="modal" data-target="#send-enquiry">
            <div className="grid">
              <figure className="effect-marley">
                <img className="img-fluid" src="img/a9.jpg" />
                <figcaption>
                  <h2>
                    Mumbai
                    <span>
                      {' '}
                      <br /> 180 + Listing{' '}
                    </span>
                  </h2>
                  <p>
                    <a className="text-white">Explore</a>
                  </p>
                  <a href="">View more</a>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="item" data-toggle="modal" data-target="#send-enquiry">
            <div className="grid">
              <figure className="effect-marley">
                <img className="img-fluid" src="img/a11.jpg" />
                <figcaption>
                  <h2>
                    Kerala
                    <span>
                      {' '}
                      <br /> 158 + Listing{' '}
                    </span>
                  </h2>
                  <p>
                    <a className="text-white">Explore</a>
                  </p>
                  <a href="">View more</a>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="item" data-toggle="modal" data-target="#send-enquiry">
            <div className="grid">
              <figure className="effect-marley">
                <img className="img-fluid" src="img/a4.jpg" />
                <figcaption>
                  <h2>
                    Ladakh
                    <span>
                      {' '}
                      <br /> 183 + Listing{' '}
                    </span>
                  </h2>
                  <p>
                    <a className="text-white">Explore</a>
                  </p>
                  <a href="">View more</a>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="item" data-toggle="modal" data-target="#send-enquiry">
            <div className="grid">
              <figure className="effect-marley">
                <img className="img-fluid" src="img/a3.jpg" />
                <figcaption>
                  <h2>
                    Manali & Shimla{' '}
                    <span>
                      <br /> 5 + Listing
                    </span>
                  </h2>
                  <p>
                    <a className="text-white">Explore</a>
                  </p>
                  <a href="">View more</a>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="item" data-toggle="modal" data-target="#send-enquiry">
            <div className="grid">
              <figure className="effect-marley">
                <img className="img-fluid" src="img/a2.jpg" />
                <figcaption>
                  <h2>
                    Goa{' '}
                    <span>
                      <br /> 8 + Listing
                    </span>
                  </h2>
                  <p>
                    <a className="text-white">Explore</a>
                  </p>
                  <a href="">View more</a>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="item" data-toggle="modal" data-target="#send-enquiry">
            <div className="grid">
              <figure className="effect-marley">
                <img className="img-fluid" src="img/a8.jpg" />
                <figcaption>
                  <h2>
                    Bangkok
                    <span>
                      {' '}
                      <br /> 12 + Listing{' '}
                    </span>
                  </h2>
                  <p>
                    <a className="text-white">Explore</a>
                  </p>
                  <a href="">View more</a>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="item" data-toggle="modal" data-target="#send-enquiry">
            <div className="grid">
              <figure className="effect-marley">
                <img className="img-fluid" src="img/a1.jpg" />
                <figcaption>
                  <h2>
                    Bali
                    <span>
                      {' '}
                      <br /> 220 + Listing{' '}
                    </span>
                  </h2>
                  <p>
                    <a className="text-white">Explore</a>
                  </p>
                  <a href="">View more</a>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="item" data-toggle="modal" data-target="#send-enquiry">
            <div className="grid">
              <figure className="effect-marley">
                <img className="img-fluid" src="img/a5.jpg" />
                <figcaption>
                  <h2>
                    Sikkim
                    <span>
                      {' '}
                      <br /> 104 + Listing{' '}
                    </span>
                  </h2>
                  <p>
                    <a className="text-white">Explore</a>
                  </p>
                  <a href="">View more</a>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="item" data-toggle="modal" data-target="#send-enquiry">
            <div className="grid">
              <figure className="effect-marley">
                <img className="img-fluid" src="img/a7.jpg" />
                <figcaption>
                  <h2>
                    Bangalore
                    <span>
                      {' '}
                      <br /> 104 + Listing{' '}
                    </span>
                  </h2>
                  <p>
                    <a className="text-white">Explore</a>
                  </p>
                  <a href="">View more</a>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="item" data-toggle="modal" data-target="#send-enquiry">
            <div className="grid">
              <figure className="effect-marley">
                <img className="img-fluid" src="img/a6.jpg" />
                <figcaption>
                  <h2>
                    Rishikesh
                    <span>
                      {' '}
                      <br /> 104 + Listing{' '}
                    </span>
                  </h2>
                  <p>
                    <a className="text-white">Explore</a>
                  </p>
                  <a href="">View more</a>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}
export default PopularDestCarousel;