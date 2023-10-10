import React, { useEffect, useState } from 'react';

function DestinationCarousel(props) {

  return (
    <div className="section-white py-4">
      <div className="container">
        <h3 className="caption font-weight-normal font-25 text-left mb-2">
          Best priced packages for your holiday DURATION
        </h3>
        <hr className="section_header-divider" />

        <div className="owl-carousel owl-carousel-des-3 owl-theme mt-5">
          <div className="grid bg-white gallery active">
            <div className="grid2">
              <div className="effect-marley border-0">
                <img className="img-fluid w-100 img-res" title="" src="img/card8.jpg" alt="" />
              </div>
            </div>
            <div className="pl-3 pr-3 pb-3 pt-1 bg-white">
              <h5 className="card-title my-2">
                <a href="#!" className="text-dark font-16 font-weight-500 des-box-heading" title="">
                  {' '}
                  Kochi wer2
                </a>
              </h5>
              <div className="pb-2 pt-2">
                <div className="text-black font-12 font-weight-bold des-box-text">
                  Indian port with colonial Fort Kochi, plus 16th-century Portuguese churches &
                  Paradesi Synagogue.{' '}
                </div>
              </div>
            </div>
          </div>
          <div className="grid bg-white gallery">
            <div className="grid2">
              <div className="effect-marley border-0">
                <img className="img-fluid w-100 img-res" title="" src="img/card9.jpg" alt="" />
              </div>
            </div>
            <div className="pl-3 pr-3 pb-3 pt-1 bg-white">
              <h5 className="card-title my-2">
                <a href="#!" className="text-dark font-16 font-weight-500 des-box-heading" title="">
                  {' '}
                  Alappuzha{' '}
                </a>
              </h5>
              <div className="pb-2 pt-2">
                <div className="text-black font-12 font-weight-bold des-box-text">
                  Indian port with colonial Fort Kochi, plus 16th-century Portuguese churches &
                  Paradesi Synagogue.{' '}
                </div>
              </div>
            </div>
          </div>
          <div className="grid bg-white gallery">
            <div className="grid2">
              <div className="effect-marley border-0">
                <img className="img-fluid w-100 img-res" title="" src="img/card11.jpg" alt="" />
              </div>
            </div>
            <div className="pl-3 pr-3 pb-3 pt-1 bg-white">
              <h5 className="card-title my-2">
                <a href="#!" className="text-dark font-16 font-weight-500 des-box-heading" title="">
                  {' '}
                  Munnar{' '}
                </a>
              </h5>
              <div className="pb-2 pt-2">
                <div className="text-black font-12 font-weight-bold des-box-text">
                  Indian port with colonial Fort Kochi, plus 16th-century Portuguese churches &
                  Paradesi Synagogue.{' '}
                </div>
              </div>
            </div>
          </div>
          <div className="grid bg-white gallery">
            <div className="grid2">
              <div className="effect-marley border-0">
                <img className="img-fluid w-100 img-res" title="" src="img/card12.jpg" alt="" />
              </div>
            </div>
            <div className="pl-3 pr-3 pb-3 pt-1 bg-white">
              <h5 className="card-title my-2">
                <a href="#!" className="text-dark font-16 font-weight-500 des-box-heading" title="">
                  {' '}
                  Thiruvananthapuram{' '}
                </a>
              </h5>
              <div className="pb-2 pt-2">
                <div className="text-black font-12 font-weight-bold des-box-text">
                  Indian port with colonial Fort Kochi, plus 16th-century Portuguese churches &
                  Paradesi Synagogue.{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DestinationCarousel;