import React, { useEffect, useState } from 'react';

function DestinationGridDy(props) {


useEffect(() => {
  setAllSliderData(props.allSliderData);
}, [props.allSliderData]);

  return (
    allSliderData.allWebSliderList.map(article => (
    <div className="section-white" key={Math.random()}>
      <div className="container" key={Math.random()}>
        {/* <!-- homepage web slider--> */}
        <h3 className="caption font-weight-normal font-25 text-left mb-2">{article.title}</h3>
        <hr className="section_header-divider" />
        <div className="owl-carousel my-4" id="slider2">
          {article.allWebSliderContentList ?article.allWebSliderContentList.map(
            allWebSliderContent => (
              <div className="item col-md-12 p-2" key={Math.random()}>
                <div className="grid bg-white gallery">
                  {/* <LazyLoadImage
                        alt={allWebSliderContent.title}
                        src={allWebSliderContent.imageHeaderData.imageURL}
                      /> */}
                  <div className="home-rating">
                    <span className="float-right">
                      <ul className="rating">
                        <li>
                          <i className="fas fa-star font-10 text-danger"></i>{' '}
                        </li>
                        <li>
                          <i className="fas fa-star font-10 text-danger"></i>{' '}
                        </li>
                        <li>
                          <i className="fas fa-star font-10 text-danger"></i>{' '}
                        </li>
                        <li>
                          <i className="fas fa-star font-10 text-secondary"></i>{' '}
                        </li>
                        <li>
                          <i className="fas fa-star font-10 text-secondary"></i>{' '}
                        </li>
                      </ul>
                    </span>
                  </div>
                  <div className="px-3 py-3">
                    <h5 className="card-title mb-2" style={{ height: '25px', overflow: 'hidden' }}>
                      <a href="#!" className="text-dark font-18 font-weight-bold" title="">
                        {allWebSliderContent.title}
                      </a>
                    </h5>
                    <div className="border-bottom border-top pt-2 pb-2">
                      <div className="text-secondary font-14" style={{ padding: '0px' }}>
                        <div
                          className="two-line-text"
                          dangerouslySetInnerHTML={{
                            __html: allWebSliderContent.desc
                              ? allWebSliderContent.desc
                              : ''
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-md-12 pl-0 pr-0">
                      <div className="bg-primary px-2 text-white float-right font-14 mt-3 border-radius-25">
                        {allWebSliderContent.startingDisountPrice}% off
                      </div>
                      <span className="text-black">
                        <span>
                          <del> ₹ {allWebSliderContent.startingPrice} </del>
                        </span>
                      </span>
                      <h4 className="text-black mb-0 font-weight-bolder">
                        <strong>
                          <i className="fa fa-inr" aria-hidden="true"></i>
                          {allWebSliderContent.startingPromoPrice}
                        </strong>
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-6 col-sm-12 mt-2 pr-1">
                        <a
                          data-toggle="modal"
                          data-target="#send-enquiry"
                          href="#!"
                          className="btn btn-sm btn-gray btn-block"
                        >
                          Send Enquiry
                        </a>
                      </div>
                      <div className="col-md-6 col-6 col-sm-12 mt-2 pl-1">
                        <a
                          className="btn btn-sm btn-no-color btn-block"
                          href={`/packages/${allWebSliderContent.itemCode}`}
                        >
                          Check Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ):''}
        </div>
      </div>
    </div>
  ))
  );
}
export default DestinationGridDy;