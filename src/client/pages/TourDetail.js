import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // ES6
import { fetchTourDetail } from '../actions/tourList';


import { fetchWebsiteMenuList, fetchWebsiteSetting } from '../actions/websiteMenu';
import MetaTags from '../Utils/metaTags';
import HomePageBanner from './HomePageBanner';
import BannerPill from './BannerPill';
import PopularDestCarousel from './PopularDestCarousel';
import MarketPlaceBanner from './MarketPlaceBanner';
import ReviewCarousel from './ReviewCarousel';
import DestinationCarousel from './DestinationCarousel';
import DestinationGrid from './DestinationGrid';
import SubscribeBox from './SubscribeBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import HowTourWork from './HowTourWork';
import DestinationGridDy from './DestinationGridDy';

import Header from '../components/desktop/Header';
import Footer from '../components/desktop/Footer';
import { getMenuMap, getSeoFromTourDetail } from '../Utils/util';
import ShareButtonLink from './shareButtonLink';
import config from '../../../config';
import LeadFormUser from '../pages/leadForm';

const TourDetail = props => {
  const [tourListData, setTourListData] = useState(props.tourListData);
  const [websiteSetting, setWebsiteSetting] = useState(props.websiteSetting);
  
  const [websiteMenu, setWebsiteMenu] = useState(props.websiteMenu);

  let websiteMenuMap = getMenuMap(websiteMenu.websiteMenu);
  let websiteSettingMain = websiteSetting.websiteSetting.websiteSettingMain;
  let seoDetail = websiteSetting.websiteSetting.websiteSettingMain.seoDetail;

  const handleButtonClicked = () => {
    var searchQuery = this.state.searchQuery;
    window.location.href = 'https://youtube.com/results?search_query' + searchQuery;
  };
  const showContent = false;

  const [tourDetailData, setTourDetailData] = useState(props.tourDetailData);
  const [tourDetail, setTourDetail] = useState(
    props.tourDetailData && props.tourDetailData.tour ? props.tourDetailData.tour : null
  );
  const [tourSeoDetail, setTourSeoDetail] = useState(
    props.tourDetailData && props.tourDetailData.tour && props.tourDetailData.tour.seoDetail
      ? props.tourDetailData.tour.seoDetail
      : null
  );
  const [imageHeader, setImageHeader] = useState(
    props.tourDetailData.tour && props.tourDetailData.tour.imageHeaderData
      ? props.tourDetailData.tour.imageHeaderData
      : null
  );
  const { articles, location, match } = props;

  if (tourSeoDetail) {
    getSeoFromTourDetail(seoDetail, tourSeoDetail, imageHeader, location);
  }

  const renderArticles = () => {
    return (
      <div>
        {
          // JSON.stringify(seoDetail)
        }
        <Header
          websiteMenuLeft={websiteMenuMap.get('PRIMARY_LEFT')}
          websiteMenuRight={websiteMenuMap.get('PRIMARY_RIGHT')}
          websiteSetting={websiteSetting}
        />
        {tourDetailData != null && tourDetailData.availabilityCount > 0 && tourDetail ? (
          <div className="blue-grey-section">
            <div className="videoimage">
              <img
                src={
                  tourDetail.imageHeaderData && tourDetail.imageHeaderData.imageURL
                    ? tourDetail.imageHeaderData.imageURL
                    : '/img/s4.jpg'
                }
                className="img-fluid"
              />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-2 col-6 pb-4">
                  {tourDetail.imageHeaderData != undefined &&
                  tourDetail.imageHeaderData.imageURL ? (
                    <div className="gallery">
                      <button
                        className="gallery-P5FyU"
                        type="button"
                        data-toggle="modal"
                        data-target="#gallery"
                      >
                        <div className="mr-2">
                          <svg height="18" width="18" fill="currentColor" viewBox="0 0 83.48 73.46">
                            <title>gallery</title>
                            <path d="M76.8 0H16.7A6.68 6.68 0 0 0 10 6.68V10H6.68A6.68 6.68 0 0 0 0 16.7v50.08a6.68 6.68 0 0 0 6.68 6.68h60.1a6.68 6.68 0 0 0 6.68-6.68v-3.34h3.34a6.68 6.68 0 0 0 6.68-6.68V6.68A6.68 6.68 0 0 0 76.8 0zm-6.68 60.11v6.68a3.34 3.34 0 0 1-3.34 3.34H6.68a3.34 3.34 0 0 1-3.34-3.34v-8.94c7-6.83 11.61-11.19 13.78-13a4.21 4.21 0 0 1 3.11-1.24 3.75 3.75 0 0 1 2.37 1.9c1.23 1.87 3.59 5.92 7 12l1.26 2.23 1.53-2C44.29 41.88 51.31 32.55 53.28 30a3.4 3.4 0 0 1 2.91-1.61 2.89 2.89 0 0 1 2.19 1.7c.84 1.82 4.69 9.46 11.74 23.31zm0-14.06c-5.08-10-8-15.86-8.71-17.35a6.21 6.21 0 0 0-4.84-3.62c-1.26-.14-3.71 0-5.93 2.88-1.9 2.45-8.41 11.1-19.36 25.74-2.84-5-4.77-8.26-5.89-10a7 7 0 0 0-4.65-3.37A7.26 7.26 0 0 0 15 42.29c-2 1.63-5.92 5.29-11.68 10.89V16.7a3.34 3.34 0 0 1 3.34-3.34h60.1a3.34 3.34 0 0 1 3.34 3.34zm10 10.72a3.34 3.34 0 0 1-3.34 3.34h-3.32V16.7a6.68 6.68 0 0 0-6.68-6.7H13.36V6.68a3.34 3.34 0 0 1 3.34-3.34h60.1a3.34 3.34 0 0 1 3.34 3.34z"></path>
                          </svg>
                        </div>
                        View Gallery
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              {tourDetail.imageDetails ? (
                <div
                  className="modal fade pr-0"
                  id="gallery"
                  role="dialog"
                  aria-labelledby="exampleModalLongTitle1"
                >
                  <div className="modal-dialog modal-lg pt-0" role="document">
                    <div className="modal-content" style={{ overflow: 'hidden' }}>
                      <div className="modal-header" style={{ zIndex: '1000' }}>
                        <h6 className="mb-0 text-black"> View Gallary </h6>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="modal-body p-0 text-center">
                        <div
                          id="carouselExampleIndicators-tour"
                          className="carousel slide"
                          data-ride="carousel"
                        >
                          <div className="carousel-inner carousel-inner-height">
                            {tourDetail.imageDetails
                              ? tourDetail.imageDetails.map((imageData, indexd) => (
                                  <div className={`carousel-item ${indexd == 0 ? 'active' : ''}`}>
                                    <img className="d-block w-100" src={imageData.imageURL} />
                                  </div>
                                ))
                              : ''}
                          </div>
                          <a
                            className="carousel-control-prev"
                            href="#carouselExampleIndicators-tour"
                            role="button"
                            data-slide="prev"
                          >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                          </a>
                          <a
                            className="carousel-control-next"
                            href="#carouselExampleIndicators-tour"
                            role="button"
                            data-slide="next"
                          >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
              {tourDetail.tourData ? (
                <div className="row">
                  <div className="col-md-4 py-3 px-0 mb-large order-lg-2">
                    <div className="summarybackcolor">
                      {/* <div className="post-bar single-post">
                  <div className="bar-content">
                    <small className="p-3">Awesome Trip, Lets Tell Our Friends</small>
                    <ShareButtonLink
                      imageUrl={
                        tourDetail.imageHeaderData != undefined
                          ? tourDetail.imageHeaderData.imageURL
                          : '/img/s4.jpg'
                      }
                      title={`Pay only ${tourDetail.tourData.tourMonthlyPrice.startingPromoPrice} for${tourDetail.tourData.title}`}
                      linkUrl={`${config.webUrl}/packages/${tourDetail.tourData.tourCode}`}
                    ></ShareButtonLink>
                  </div>
                </div> */}
                      {/* <div className="ratings p-2">
                    <a href="">
                      <i className="fas fa-heart float-right mt-1 text-danger"></i>
                    </a>
                    <div className="">
                      <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                      <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                      <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                      <i className="fa fa-star font-12 text-black" aria-hidden="true"></i>
                      <i className="fa fa-star font-12 text-black" aria-hidden="true"></i>
                    </div>
                  </div> */}
                      {/* {tourDetail.tourData.hotelCategory} */}
                      <div className="summary-price">
                        <div className="row">
                          <div className="col-md-12 col-12">
                            <p className="font-12 text-white mb-0">
                              {tourDetail.tourData.title} {/* ({tourDetail.tourData.tourCode}) */}
                            </p>
                          </div>
                        </div>
                        {tourDetail.tourData.tourMonthlyPrice ? (
                          <div className="row">
                            <div className="col-md-6 col-6 p-3">
                              {/* <p className="font-12 text-white mb-0">{tourDetail.tourData.tourMonthlyPrice.startingDisountPrice ? 'Valued Upto' : 'You Pay'}</p> */}
                              <h2 className="mb-0 text-white font-weight-bold">
                                <i className="fas fa-inr"></i> &nbsp;
                                {tourDetail.tourData.tourMonthlyPrice.startingPrice
                                  ? tourDetail.tourData.tourMonthlyPrice.startingPrice
                                  : tourDetail.tourData.tourMonthlyPrice.startingPromoPrice}
                              </h2>
                            </div>

                            <div className="col-md-6 col-6 p-3 hidden">
                              {tourDetail.tourData.tourMonthlyPrice.startingPromoPrice ? (
                                <>
                                  <p className="font-12 mb-1 text-white ml-4 text-right">
                                    YOU SAVE
                                  </p>
                                  <div className="price_left">
                                    <span className="discount-Percent">
                                      {tourDetail.tourData.tourMonthlyPrice.startingDisountPrice} %
                                    </span>
                                    <span className="discounted_price text-white float-right">
                                      <i className="fas fa-inr"></i>
                                      <span>
                                        {tourDetail.tourData.tourMonthlyPrice.startingPrice}
                                      </span>
                                    </span>
                                  </div>
                                </>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                        ) : (
                          ''
                        )}
                        {tourDetail.tourData.days ? (
                          <div className="stop-place text-white">
                            <i className="fas fa-moon-o text-primary" aria-hidden="true"></i>
                            <span className="text"> {tourDetail.tourData.days - 1} Night</span> /
                            <i className="fas fa-sun-o text-warning" aria-hidden="true"></i>
                            <span className="text"> {tourDetail.tourData.days} Days</span>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>

                      <div className="detail-label-1">
                        <div className="booking_points">
                          <ul style={{ listStyleType: 'none' }}>
                            {tourDetail.tourData.highestAltitude &&
                            tourDetail.tourData.highestAltitude > 0 ? (
                              <li>
                                <img alt="Sprite" src="/img/sprite-fa.png" />
                                <span className="point_name">
                                  {tourDetail.tourData.highestAltitude} ft Atlitude
                                </span>
                              </li>
                            ) : (
                              ''
                            )}
                            {tourDetail.tourData.minimumAge &&
                            tourDetail.tourData.minimumAge > 0 ? (
                              <li>
                                <img alt="Sprite" src="/img/sprite-fa.png" />
                                <span className="point_name">
                                  {tourDetail.tourData.minimumAge} Yrs of Minimum Age{' '}
                                </span>
                              </li>
                            ) : (
                              ''
                            )}
                            {tourDetail.tourData.activityLevel &&
                            tourDetail.tourData.activityLevel > 0 ? (
                              <li>
                                <img alt="Sprite" src="/img/sprite-fa.png" />
                                <span className="point_name">
                                  {tourDetail.tourData.activityLevel} difficulty level
                                </span>
                              </li>
                            ) : (
                              ''
                            )}
                            {/* {tourDetail.tourData.maximumPassengerAllowed > 0 ?
                          <li>
                            <img alt="Sprite" src="/img/sprite-fa.png" />
                            <span className="point_name">{tourDetail.tourData.maximumPassengerAllowed} Maximum Passengers Allowed</span>
                          </li>
                          : ''}
                        {tourDetail.tourData.minimumPassengerAllowed > 0 ?
                          <li>
                            <img alt="Sprite" src="/img/sprite-fa.png" />
                            <span className="point_name">{tourDetail.tourData.minimumPassengerAllowed} Minimum Passengers Required</span>
                          </li>
                          : ''} */}
                            {/* <li>
                          <img alt="Sprite" src="/img/sprite-fa.png" />
                          <span className="point_name">No Booking Fees</span>
                        </li>
                        <li>
                          <img alt="Sprite" src="/img/sprite-fa.png" />
                          <span className="point_name">Money Safe Guarantee</span>
                        </li> */}
                            {tourDetail.tourData.confirmBeforeBooking ? (
                              <li>
                                <img alt="Sprite" src="/img/sprite-fa.png" />
                                <span className="point_name">Instant Confirmation Voucher</span>
                              </li>
                            ) : (
                              ''
                            )}
                          </ul>
                        </div>
                        <div className="text-center">
                          {/* <a
                        href=""
                        className="btn btn-secondary btn-block"
                        data-toggle="modal"
                        data-target=".bd-example-modal-lg"
                      > */}
                          <a
                            data-toggle="modal"
                            target="_self"
                            href="#send-enquiry"
                            className="btn btn-secondary btn-block"
                          >
                            Send Enquiry
                          </a>
                        </div>
                        {tourDetail.tourData.confirmBeforeBooking ? (
                          <div className="text-center mt-2">
                            <a href="#!" className="btn btn-no-color btn-block">
                              Book My Tour
                            </a>
                          </div>
                        ) : (
                          ''
                        )}
                        {/* 
                                    <div className="mt-4 mb-3 pb-2">
                                      <a onclick="launch_toast()" href="" className="text-dark" data-toggle="tooltip" data-placement="top" title="Click to copy tour code"> <i className="fas fa-share-alt text-primary mr-2"></i>Share With Friends <strong> Tour Code : TC-18</strong> </a>
                                      <div className="summary-houres mb-2 mt-2">
                                    <div id="toast">
                                          <div id="img">Copied</div>
                                          <div id="desc">share with your Friends</div>
                                        </div>
                                </div>
                                    </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 pt-0 pb-3">
                    <p className="font-22 pt-0 pl-0 pb-2 text-black border-bottom cursor-pointer itinerary font-weight-bold">
                      {tourDetail.tourData.title}
                    </p>
                    <div className="info-container d-flex">
                      {tourDetail.tourData.activityLevel ? (
                        <div className="info-block d-flex">
                          <img
                            loading="lazy"
                            src="/img/icon/trek.png"
                            alt="Difficulty"
                            className="quick-icon lazyloaded"
                            data-was-processed="true"
                          />
                          <noscript>
                            <img src="/img/icon/trek.png" alt="Difficulty" className="quick-icon" />
                          </noscript>
                          <div className="quick-content">
                            <div className="quick-label">Difficulty</div>
                            <div className="quick-detail">{tourDetail.tourData.activityLevel}</div>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      {tourDetail.tourData.days ? (
                        <div className="info-block">
                          <img
                            loading="lazy"
                            src="/img/icon/calendar.png"
                            alt="Duration"
                            className="quick-icon lazyloaded"
                            data-was-processed="true"
                          />
                          <noscript>
                            <img
                              src="/img/icon/calendar.png"
                              alt="Duration"
                              className="quick-icon"
                            />
                          </noscript>
                          <div className="quick-content">
                            <div className="quick-label">Duration</div>
                            <div className="quick-detail">{tourDetail.tourData.days} Days</div>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      {tourDetail.tourData.highestAltitude ? (
                        <div className="info-block">
                          <img
                            loading="lazy"
                            src="/img/icon/hills.png"
                            alt="Altitude"
                            className="quick-icon lazyloaded"
                            data-was-processed="true"
                          />
                          <noscript>
                            <img src="/img/icon/hills.png" alt="Altitude" className="quick-icon" />
                          </noscript>
                          <div className="quick-content">
                            <div className="quick-label">Maximum Altitude</div>
                            <div className="quick-detail">
                              {tourDetail.tourData.highestAltitude} ft{' '}
                            </div>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      {tourDetail.locationData && tourDetail.locationData.city ? (
                        <div className="info-block">
                          <img
                            loading="lazy"
                            src="/img/icon/bus.png"
                            alt="Pickup point"
                            className="quick-icon lazyloaded"
                            data-was-processed="true"
                          />
                          <noscript>
                            <img
                              src="/img/icon/bus.png"
                              alt="Pickup point"
                              className="quick-icon"
                            />
                          </noscript>
                          <div className="quick-content">
                            <div className="quick-label">Pickup point</div>
                            <div className="quick-detail">{tourDetail.locationData.city}</div>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    {tourDetail.locationDataList ? (
                      <div className="">
                        <p className="font-22 pt-0 pl-0 pb-2 text-black border-bottom cursor-pointer itinerary font-weight-bold">
                          Destinations
                        </p>
                        <ul className="d-inline-flex pl-0 font-12">
                          {tourDetail.locationDataList
                            ? tourDetail.locationDataList.map(locationData => (
                                <li className="pl-2 pr-2 text-center list-unstyled">
                                  <a href="" className="text-dark">
                                    {locationData.city},{locationData.country}
                                  </a>
                                </li>
                              ))
                            : ''}
                        </ul>
                      </div>
                    ) : (
                      ''
                    )}
                    {tourDetail.tourData.tourAmenityList ? (
                      <div className="booking_points">
                        <div className="">
                          <p className="font-22 pt-0 pl-0 pb-2 text-black border-bottom cursor-pointer itinerary font-weight-bold">
                            Inclusions
                          </p>
                          <ul className="d-inline-flex pl-0 font-12">
                            {tourDetail.tourData.tourAmenityList
                              ? tourDetail.tourData.tourAmenityList.map(tourAmenity => (
                                  <li
                                    className="pl-2 pr-2 text-center list-unstyled"
                                    key={Math.random()}
                                  >
                                    <a href="" className="text-dark">
                                      {tourAmenity.text}
                                    </a>
                                  </li>
                                ))
                              : ''}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {/* {tourDetail.tourData.tourAmenityList ?
                  <div className="mt-2 pt-2 mb-2 border-top">
                    {tourDetail.tourData.tourAmenityList
                      ? tourDetail.tourData.tourAmenityList.map(tourAmenity => (
                        <a href="" className="tag mr-1" key={Math.random()}>
                          <span className="badge badge-pill badge-info text-white border-radius-25 font-12 pl-2 pr-2 p-1">
                            {tourAmenity.text}
                          </span>
                        </a>
                      ))
                      : ''}
                  </div>
                  : ''} */}

                    {/* {tourDetail.locationData.locationCordinate ?
                        <div className="text-success font-14 mt-2" style={{ padding: '0px' }}>
                            <p>
                              {' '}
                              <i className="fa fa-moon-o text-primary"></i>{' '}
                              {tourDetail.locationData.locationCordinate.country}
                              <i className="fa fa-sun-o text-warning"></i>{' '}
                              {tourDetail.locationData.locationCordinate.order}
                              <i className="fa fa-moon-o text-primary"></i>{' '}
                              {tourDetail.locationData.locationCordinate.city}
                            </p>
                          </div>
                          : ''} */}
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="section-white-padding-less pt-0 bg-transparent">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 p-0">
                    <div id="highlights"></div>
                    <div className="profile-timeline-card mb-1">
                      <p className="font-22 pt-0 pl-0 pb-2 text-black border-bottom cursor-pointer itinerary font-weight-bold">
                        <i className="fa fa-angle-down mr-3" aria-hidden="true"></i> Highlights
                      </p>
                      {tourDetail.tourData.desc ? (
                        <div id="Highlightsshow">
                          {/* <p className="caption two-line-text">
                        <strong> Himachal Pradesh </strong> - Shimla Tour Package from Delhi
                      </p>
                      <p className="caption">
                        <strong> Cities : </strong> Shimla
                      </p> */}
                          <div
                            className="caption font-14 "
                            dangerouslySetInnerHTML={{
                              __html: tourDetail.tourData.desc ? tourDetail.tourData.desc : ''
                            }}
                          ></div>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {tourDetail.itineraryList ? (
              <div className="section-white-padding-less pt-0 bg-transparent">
                <div className="container">
                  <div className="row">
                    <div id="itinerary"></div>
                    <div className="profile-timeline-card mb-1" style={{ overflow: 'hidden' }}>
                      <p className="font-22 pt-0 pl-0 pb-2 text-black border-bottom cursor-pointer itinerary font-weight-bold">
                        <i className="fa fa-angle-down mr-3" aria-hidden="true"></i> Itinerary
                      </p>
                      <div id="itineraryshow">
                        {tourDetail.itineraryList
                          ? tourDetail.itineraryList.map(itinerary => (
                              <div className="row mt-4" key={Math.random()}>
                                <div className="col-md-1 col-3 pt-0 pb-0">
                                  <div className="count-steps-style">
                                    <div className="count-steps">
                                      <div className="days-number">DAY {itinerary.day}</div>
                                      {/* <div className="day-text">DAY</div> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-11 col-9 pt-0 pb-3 pl-0 pl-sm-3">
                                  <h4 className="text-black font-16 pb-3 border-bottom font-weight-bold">
                                    {itinerary.name}
                                  </h4>
                                  <div
                                    className="text-black font-14 pt-2"
                                    dangerouslySetInnerHTML={{
                                      __html: itinerary.itemDescription
                                        ? itinerary.itemDescription
                                        : ''
                                    }}
                                  ></div>
                                  {itinerary.locationDataList ? (
                                    <div className="">
                                      <h5 className="border-bottom pb-2 mt-3">Destinations</h5>
                                      <ul className="d-inline-flex pl-0 font-12">
                                        {itinerary.locationDataList
                                          ? itinerary.locationDataList.map(locationData => (
                                              <li className="pl-2 pr-2 text-center list-unstyled">
                                                <a href="" className="text-dark">
                                                  {locationData.city},{locationData.country}
                                                </a>
                                              </li>
                                            ))
                                          : ''}
                                      </ul>
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                  {itinerary.amenityList ? (
                                    <div className="">
                                      <h5 className="border-bottom pb-2 mt-3">Inclusions</h5>
                                      <ul className="d-inline-flex pl-0 font-12">
                                        {itinerary.amenityList
                                          ? itinerary.amenityList.map(tourAmenity => (
                                              <li className="pl-2 pr-2 text-center list-unstyled">
                                                <a href="" className="text-dark">
                                                  {tourAmenity.text}
                                                </a>
                                              </li>
                                            ))
                                          : ''}
                                      </ul>
                                    </div>
                                  ) : (
                                    ''
                                  )}

                                  <div className="">
                                    <div className="mt-2 pt-2 mb-2">
                                      {itinerary.activityTypeList
                                        ? itinerary.activityTypeList.map(activity => (
                                            <a href="" className="tag mr-1">
                                              <span className="badge badge-pill badge-info text-white border-radius-25 font-12 pl-2 pr-2 p-1">
                                                {activity.name}
                                              </span>
                                            </a>
                                          ))
                                        : ''}
                                      {itinerary.tagTypeList
                                        ? itinerary.tagTypeList.map(tagType => (
                                            <a href="" className="tag mr-1">
                                              <span className="badge badge-pill badge-info text-white border-radius-25 font-12 pl-2 pr-2 p-1">
                                                {tagType.name}
                                              </span>
                                            </a>
                                          ))
                                        : ''}
                                    </div>
                                    <div className="row mt-4">
                                      {itinerary.imageList
                                        ? itinerary.imageList.map(imageData => (
                                            <div className="col-md-4">
                                              <img
                                                className="trip-timeline-image3 mb-3"
                                                src={imageData.imageURL}
                                              />
                                            </div>
                                          ))
                                        : ''}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="section-white-padding-less pt-0 bg-transparent">
              <div className="container">
                <div className="row">
                  <div id="transferDetail"></div>
                  {tourDetail.tourTransferDetailList ? (
                    <div className="profile-timeline-card mb-1 col-md-12">
                      {/* <p className="font-22 pt-0 pl-0 pb-2 text-black border-bottom cursor-pointer departdate font-weight-bold">
                      <i className="fa fa-angle-down mr-3" aria-hidden="true"></i> Tour Transfer Detail
                    </p> */}
                      <p className="font-22 pt-0 pl-0 pb-2 text-black border-bottom cursor-pointer itinerary font-weight-bold">
                        <i className="fa fa-angle-down mr-3" aria-hidden="true"></i>
                        Transfer Details
                      </p>
                      <div id="departdateshow">
                        {tourDetail.tourTransferDetailList
                          ? tourDetail.tourTransferDetailList.map(tourTransfer => (
                              <div className="row mt-4" key={Math.random()}>
                                <div className="col-md-12 pt-0 pb-0">
                                  <div>
                                    <div div className="row">
                                      {tourTransfer.pickUpCity ? (
                                        <p className="col-md-3 mb-1">
                                          <i className="fas fa-building text-primary"></i>
                                          <strong> Pick Up City </strong> <br />{' '}
                                          {tourTransfer.pickUpCity}
                                        </p>
                                      ) : (
                                        ''
                                      )}

                                      {tourTransfer.pickUpDate ? (
                                        <p className="col-md-3 mb-1">
                                          <i className="far fa-calendar-alt text-danger"></i>
                                          <strong> Pick Up Date </strong> <br />{' '}
                                          {tourTransfer.pickUpDate}
                                        </p>
                                      ) : (
                                        ''
                                      )}

                                      {tourTransfer.dropOffCity ? (
                                        <p className="col-md-3 mb-1">
                                          <i className="fas fa-building text-success"></i>
                                          <strong> Drop City </strong> <br />{' '}
                                          {tourTransfer.dropOffCity}
                                        </p>
                                      ) : (
                                        ''
                                      )}
                                      {tourTransfer.dropOffDate ? (
                                        <p className="col-md-3 mb-1">
                                          <i className="fas fa-calendar-alt text-warning"></i>
                                          <strong> Drop Date </strong> <br />{' '}
                                          {tourTransfer.insuranceAvailable}
                                        </p>
                                      ) : (
                                        ''
                                      )}
                                      <p className="col-md-3 mb-2">
                                        <i className="fas fa-plus-circle text-success"></i>
                                        <strong> Add On Available </strong> <br />{' '}
                                        {tourTransfer.addOnAvailable ? 'Yes' : 'No'}
                                      </p>
                                      <p className="col-md-3 mb-2">
                                        <i className="fas fa-hand-holding-heart text-danger"></i>
                                        <strong> Insurance Available </strong>
                                        <br /> {tourTransfer.insuranceAvailable ? 'Yes' : 'No'}
                                      </p>
                                      {tourTransfer.insuranceDetail ? (
                                        <p className="col-md-3 mb-2">
                                          <i className="fas fa-notes-medical text-primary"></i>
                                          <strong> Insurance Detail </strong> <br />{' '}
                                          {tourTransfer.insuranceDetail}
                                        </p>
                                      ) : (
                                        ''
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          : ''}
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                  {tourDetail.tourItemTypeList ? (
                    <div className="profile-timeline-card mb-1 mb-1 col-md-12">
                      <p className="font-22 pt-0 pl-0 pb-2 text-black border-bottom cursor-pointer itinerary font-weight-bold">
                        <i className="fa fa-angle-down mr-3" aria-hidden="true"></i>
                        Inclusions/Exclusions/Policies
                      </p>
                      <div id="inclusionshow">
                        <div className="row mt-4">
                          <div className="col-md-12 pt-0 pb-0">
                            <div>
                              {tourDetail.tourItemTypeList
                                ? tourDetail.tourItemTypeList.map(tourItemType => (
                                    <div key={Math.random()}>
                                      <p className="caption font-weight-bold font-18">
                                        {tourItemType.name}
                                      </p>
                                      <ul>
                                        {tourItemType.tourItemDataList
                                          ? tourItemType.tourItemDataList.map(tourItemData => (
                                              <li className="text-black" key={Math.random()}>
                                                {tourItemData.name}
                                                <p className="text-black">
                                                  {tourItemData.discription}
                                                </p>
                                              </li>
                                            ))
                                          : ''}
                                      </ul>
                                    </div>
                                  ))
                                : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                  {tourDetail.cancellationPolicyList ? (
                    <div className="profile-timeline-card mb-1 mb-1 col-md-12">
                      <p className="font-22 pt-0 pl-0 pb-2 text-black border-bottom cursor-pointer itinerary font-weight-bold">
                        <i className="fa fa-angle-down mr-3" aria-hidden="true"></i>
                        Cancellation Policy
                      </p>
                      <div id="inclusionshow">
                        <div className="row mt-4">
                          <div className="col-md-12 pt-0 pb-0">
                            <ul>
                              {tourDetail.cancellationPolicyList
                                ? tourDetail.cancellationPolicyList.map(cancellationPolicy => (
                                    <li className="text-black" key={Math.random()}>
                                      {cancellationPolicy.desc}
                                    </li>
                                  ))
                                : ''}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                  {tourDetail.faqList ? (
                    <div className="profile-timeline-card mb-1 mb-1 col-md-12">
                      <p className="font-22 pt-0 pl-0 pb-2 text-black border-bottom cursor-pointer itinerary font-weight-bold">
                        <i className="fa fa-angle-down mr-3" aria-hidden="true"></i>
                        Frequently Asked Question
                      </p>
                      <div id="faqshow">
                        {tourDetail.faqList
                          ? tourDetail.faqList.map((faq, indexed) => (
                              <div className="active" id={`accordionExample${indexed}`}>
                                <div className="row m-0">
                                  <div className="col-md-12">
                                    <div className="card mb-2 border-0">
                                      <div
                                        className="card-header card-header-2 collapsed"
                                        id="headingOne"
                                        data-toggle="collapse"
                                        data-target={`.collapseOne${indexed}`}
                                        aria-expanded="false"
                                        aria-controls={`collapseOne${indexed}`}
                                      >
                                        <h5 className="mb-0 panel-heading">
                                          <span className="font-18">{faq.question}</span>
                                        </h5>
                                      </div>

                                      <div
                                        id=""
                                        className={`collapseOne${indexed}`}
                                        aria-labelledby="headingOne"
                                        data-parent={`#accordionExample${indexed}`}
                                      >
                                        <div className="card-body text-black caption font-14">
                                          {faq.answer}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          : ''}
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                  {tourDetail.customerReviewList ? (
                    <div className="profile-timeline-card mb-1 mb-1 col-md-12">
                      <p className="font-22 pt-0 pl-0 pb-2 text-black border-bottom cursor-pointer itinerary font-weight-bold">
                        <i className="fa fa-angle-down mr-3" aria-hidden="true"></i>
                        Customer Reviews
                      </p>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="card1">
                            <div className="row hidden">
                              <div className="col-sm-12 col-lg-4">
                                <div className="card-body">
                                  <h4 className="card-title">Reviews</h4>
                                  <h5 className="card-subtitle">Overview of Review</h5>
                                  <h2 className="font-medium mt-5 mb-0">25426</h2>
                                  <span className="text-black">
                                    This month we got 346 New Reviews
                                  </span>
                                  <div className="image-box mt-4 mb-2">
                                    <a
                                      href="#"
                                      className="mr-2"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title=""
                                      data-original-title="Simmons"
                                    >
                                      <img
                                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                        className="rounded-circle"
                                        width="45"
                                        alt="user"
                                      />
                                    </a>
                                    <a
                                      href="#"
                                      className="mr-2"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title=""
                                      data-original-title="Fitz"
                                    >
                                      <img
                                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                        className="rounded-circle"
                                        width="45"
                                        alt="user"
                                      />
                                    </a>
                                    <a
                                      href="#"
                                      className="mr-2"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title=""
                                      data-original-title="Phil"
                                    >
                                      <img
                                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                        className="rounded-circle"
                                        width="45"
                                        alt="user"
                                      />
                                    </a>
                                    <a
                                      href="#"
                                      className="mr-2"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title=""
                                      data-original-title="Melinda"
                                    >
                                      <img
                                        src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                        className="rounded-circle"
                                        width="45"
                                        alt="user"
                                      />
                                    </a>
                                  </div>
                                  <a
                                    href="#"
                                    className="btn btn-lg btn-info waves-effect waves-light"
                                  >
                                    Checkout All Reviews
                                  </a>
                                </div>
                              </div>
                              <div className="col-sm-12 col-lg-8 border-left">
                                <div className="card-body">
                                  <ul className="list-style-none">
                                    <li className="mt-4">
                                      <div className="d-flex align-items-center">
                                        <i className="fa fa-smile-o display-5 text-black"></i>
                                        <div className="ml-2">
                                          <h5 className="mb-0">Positive Reviews</h5>
                                          <span className="text-black">25547 Reviews</span>
                                        </div>
                                      </div>
                                      <div className="progress">
                                        <div
                                          className="progress-bar bg-success"
                                          role="progressbar"
                                          style={{ width: '47%' }}
                                          aria-valuenow="47"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                        ></div>
                                      </div>
                                    </li>
                                    <li className="mt-5">
                                      <div className="d-flex align-items-center">
                                        <i className="fa fa-frown-o display-5 text-black"></i>
                                        <div className="ml-2">
                                          <h5 className="mb-0">Negative Reviews</h5>
                                          <span className="text-black">5547 Reviews</span>
                                        </div>
                                      </div>
                                      <div className="progress">
                                        <div
                                          className="progress-bar bg-orange"
                                          role="progressbar"
                                          style={{ width: '33%' }}
                                          aria-valuenow="33"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                        ></div>
                                      </div>
                                    </li>
                                    <li className="mt-5 mb-1">
                                      <div className="d-flex align-items-center">
                                        <i className="fa fa-meh-o display-5 text-black"></i>
                                        <div className="ml-2">
                                          <h5 className="mb-0">Neutral Reviews</h5>
                                          <span className="text-black">547 Reviews</span>
                                        </div>
                                      </div>
                                      <div className="progress">
                                        <div
                                          className="progress-bar bg-info"
                                          role="progressbar"
                                          style={{ width: '20%' }}
                                          aria-valuenow="20"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                        ></div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            {tourDetail.customerReviewList
                              ? tourDetail.customerReviewList.map(reviews => (
                                  <div className="row">
                                    <div className="col-sm-12 col-lg-12 border-left">
                                      <div className="reviews-members pt-4 pb-4">
                                        <div className="media">
                                          <div className="image-box mt-4 mb-2">
                                            <a
                                              href="#"
                                              className="mr-2"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title=""
                                              data-original-title="Simmons"
                                            >
                                              <img
                                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                className="rounded-circle"
                                                width="45"
                                                alt="user"
                                              />
                                            </a>
                                          </div>
                                          <div className="media-body">
                                            <div className="reviews-members-header">
                                              <span className="star-rating float-right">
                                                {' '}
                                                <a href="#">
                                                  <i className="icofont-ui-rating active"></i>
                                                </a>{' '}
                                                <a href="#">
                                                  <i className="icofont-ui-rating active"></i>
                                                </a>{' '}
                                                <a href="#">
                                                  <i className="icofont-ui-rating active"></i>
                                                </a>
                                                <a href="#">
                                                  <i className="icofont-ui-rating active"></i>
                                                </a>{' '}
                                                <a href="#">
                                                  <i className="icofont-ui-rating"></i>
                                                </a>{' '}
                                              </span>
                                              <h6 className="mb-1">
                                                <a className="text-black" href="#">
                                                  Gurdeep Singh
                                                </a>
                                              </h6>
                                              <p className="text-gray">Tue, 20 Mar 2020</p>
                                            </div>
                                            <div className="reviews-members-body">
                                              <p>{reviews.customerReviewDetail.prosCommment}</p>
                                            </div>
                                            <div className="reviews-members-footer">
                                              <div className="row mt-4">
                                                {reviews.customerReviewImageList
                                                  ? reviews.customerReviewImageList.map(
                                                      imageData => (
                                                        <div className="col-md-4">
                                                          <img
                                                            className="trip-timeline-image3 mb-3"
                                                            src={imageData.imageURL}
                                                          />
                                                        </div>
                                                      )
                                                    )
                                                  : ''}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {/* <div id="map"></div>
                  <div className="profile-timeline-card mb-1">
                    <p className="font-22 pt-0 pl-0 pb-2 text-black border-bottom cursor-pointer LocationGettingThere">
                      <i className="fa fa-angle-down mr-3" aria-hidden="true"></i> Location &
                      Getting There
                    </p>

                    <div id="LocationGettingThereshow">
                      <div className="w-100 h-100">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.109877992184!2d77.3650985411305!3d28.626468782366256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce57d74e83585%3A0x24a215c8b1adfd3a!2sSpysr!5e0!3m2!1sen!2sin!4v1583133085190!5m2!1sen!2sin"
                          width="100%"
                          height="450"
                          frameBorder="0"
                          style={{ border: '0' }}
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div> */}

                  <div
                    className="white-section mb-1 d-md-block d-none hidden"
                    style={{
                      background: 'linear-gradient(45deg, #3F51B5, #000000)',
                      boxShadow: '0 1.5rem 3rem -0.7rem rgba(62, 83, 181, 0.5)'
                    }}
                  >
                    <div className="container">
                      <div className="row text-white">
                        <div className="col-md-3 display-hide">
                          <a
                            className="float-left tourdeal"
                            data-toggle="modal"
                            data-target="#send-enquiry"
                            href=""
                            style={{ top: '-70px', left: '20px' }}
                          >
                            <img src="/img/offer-2.png" className="img-fluid" />
                          </a>
                        </div>
                        <div className="col-md-3">
                          <h2 className="at-thrilo">At TourOxy You’ll get</h2>
                          <p className="wide-range">Wide Range:</p>
                          <p>
                            10,000+ Travel Experiences
                            <br /> in 25+ Countries
                          </p>
                        </div>
                        <div className="col-md-3">
                          <i className="far fa-thumbs-up h5 text-primary"></i>
                          <p className="wide-range">Easy Booking:</p>
                          <p>
                            Instant book with suppliers
                            <br /> in real time
                          </p>
                        </div>
                        <div className="col-md-3">
                          <i className="fas fa-shield-alt h5 text-success"></i>
                          <p className="wide-range"> Secure Payments </p>
                          <p>
                            Hustle Free Way To <br />
                            Make Payments
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark p-2 bookingfixprice">
              <div className="container">
                <h4 className="d-none d-md-inline float-left font-weight-bold">
                  {tourDetail.tourData.title}
                  {tourDetail.tourData.days ? (
                    <div className="stop-place border-top-0 pb-0 font-weight-light font-14 text-white">
                      <span className="mb-0 text-white">
                        <i className="fa fa-moon-o text-primary" aria-hidden="true"></i>
                        <span className="text">{tourDetail.tourData.days - 1} Night</span> /
                        <i className="fa fa-sun-o text-warning" aria-hidden="true"></i>
                        <span className="text">{tourDetail.tourData.days} Days</span>
                      </span>
                    </div>
                  ) : (
                    ''
                  )}
                </h4>
                <div className="d-none d-md-inline">
                  <div className="text-center float-right mt-2">
                    <a className="btn btn-no-color" aria-hidden="true">
                      Book My Tour
                    </a>
                  </div>
                </div>

                <div className="d-inline d-md-none">
                  <div className="text-center float-right">
                    <a href="#!" className="btn btn-no-color" aria-hidden="true">
                      Book Now
                    </a>
                  </div>
                  <div className="text-center float-right">
                    <a
                      href=""
                      className="btn btn-secondary"
                      data-toggle="modal"
                      data-target=".bd-example-modal-lg"
                    >
                      Enquiry
                    </a>
                  </div>
                </div>

                <div className="float-left float-md-right mr-4 mt-2">
                  <h3 className="mb-0 text-white font-weight-bold">
                    <span className="font-12 text-white font-weight-normal mb-0 d-none d-md-inline">
                      VALUED UP TO
                    </span>
                    <i className="fa fa-inr"></i>
                    {tourDetail.tourData.tourMonthlyPrice.startingPromoPrice}
                  </h3>
                </div>
              </div>
            </div>
            {/* <!--popup-END--> */}
          </div>
        ) : (
          <div className="ui container">
            <div className="section-white">
              <div className="container mt-5 mb-50">
                <div className="text-center">
                  <h2>You are a real Explorer !!....</h2>
                  <p className="font-20 mb-0">
                    You found something , Which nobody could do. We believe in making your every
                    experience awesome
                  </p>
                  <p className="font-20">
                    Search from thousands of amazing packages from TourOxy Today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* {allSliderData &&
              allSliderData.allSliderData &&
              allSliderData.allSliderData.allWebSliderList ? (
                <AllSlider allSliderData={allSliderData.allSliderData}></AllSlider>
              ) : (
                ''
              )} */}
        {/* <MarketPlaceBanner></MarketPlaceBanner> */}
        {/* <ReviewCarousel></ReviewCarousel> */}
        {/* <DestinationCarousel></DestinationCarousel>
              <DestinationGrid></DestinationGrid> */}

        {websiteSettingMain && websiteSettingMain.isShowSubscribe ? (
          <SubscribeBox websiteSettingMain={websiteSettingMain}></SubscribeBox>
        ) : (
          ''
        )}
        <Footer
          websiteSetting={websiteSetting}
          websiteMenuFooter={websiteMenuMap.get('FOOTER_LEFT')}
          websiteMenuFooterRight={websiteMenuMap.get('FOOTER_RIGHT')}
        />
      </div>
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    //loadArticles();
  }, []);
  return (
    <div key={Math.random()}>
      {MetaTags.getAppMetaTags(seoDetail)}
      {renderArticles()}
    </div>
  );
};

const mapStateToProps = (state, _ownProps) => {
  /* console.log('pulling state');
  console.log(state); */
  console.log('pulling state');
  console.log(state.tourDetailData);
  return {
    tourDetailData: state.tourDetailData,
    websiteSetting: state.websiteSetting,
    
    websiteMenu: state.websiteMenu
  };
};
/* const mapDispatchToProps = dispatch => {
  return {
    getMockApi: () => dispatch(mockApi.getMockData())
  };
}; */

function doEverything(store, param) {
  return dispatch =>
    Promise.all([
    ]).then(() => {
      console.log('I did everything!');
    });
}

/* const loadData = (store, param) => {
        // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
        // So we need to use store itself to load data
        // return store.dispatch(doEverything(store,param)); // Manually dispatch a network request
      }; */
const loadData = (store, param) => {
  return Promise.all([
    store.dispatch(fetchTourDetail(param)),
    
    store.dispatch(fetchWebsiteMenuList()),
    store.dispatch(fetchWebsiteSetting())
  ]);
};

TourDetail.propTypes = {
  tourDetailData: PropTypes.objectOf(PropTypes.any),
  websiteMenu: PropTypes.objectOf(PropTypes.any),
  websiteSetting: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
  
  fetchWebsiteMenuList: PropTypes.func,
  fetchWebsiteSetting: PropTypes.func
};

TourDetail.defaultProps = {
  tourDetailData: [],
  
  websiteMenu: null,
  websiteSetting: null,
  location: null,
  match: null,
  
  fetchWebsiteMenuList: null
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onMountDispatch() {
    dispatch(fetchTourDetail(param)), 
    dispatch(fetchWebsiteMenuList());
    dispatch(fetchWebsiteSetting());
  }
});

const mergeProps = (stateProps, dispatchProps, _ownProps) => {
  const onMountDispatch = () => {
    const { host } = stateProps;
    dispatchProps.onMountDispatch();
  };
  const onUpdateDispatch = () => {
    const { host } = stateProps;
  };
  return {
    ...stateProps,
    ...dispatchProps,
    onMountDispatch,
    onUpdateDispatch
  };
};

export default {
  component: connect(mapStateToProps, mapDispatchToProps, mergeProps)(TourDetail),
  loadData
};
