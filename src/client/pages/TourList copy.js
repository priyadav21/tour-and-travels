import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // ES6
import { fetchTourList } from '../actions/tourList';

import { fetchWebsiteMenuList } from '../actions/websiteMenu';
import { fetchWebsiteSetting } from '../actions/websiteMenu';
import MetaTags from '../Utils/metaTags';
import ShareButtonLink from './shareButtonLink';
import config from '../../../config';
import Header from '../components/desktop/Header';

import { getMenuMap } from '../Utils/util';

const TourList = props => {
  const [tourListData, setTourListData] = useState(props.tourListData);
  const [websiteSetting, setWebsiteSetting] = useState(props.websiteSetting);
  
  const [websiteMenu, setWebsiteMenu] = useState(props.websiteMenu);

  let websiteMenuMap = getMenuMap(websiteMenu.websiteMenu);
  let websiteSettingMain = websiteSetting.websiteSetting.websiteSettingMain;
  let seoDetail = websiteSetting.websiteSetting.websiteSettingMain.seoDetail;

  const renderArticles = () => {
    return (
      <div>
        <Header
          websiteMenuLeft={websiteMenuMap.get('PRIMARY_LEFT')}
          websiteMenuRight={websiteMenuMap.get('PRIMARY_RIGHT')}
          websiteSetting={websiteSetting}
        />
        <div className="blue-grey-section">
          <div className="section-parallax d-none d-md-block">
            <div className="parallax pb-5 pt-5">
              <div className="container mt-5 pt-4 mb-5">
                <div className="suppler-contact text-white text-center text-shadow">
                  <h1>Best Tour Packages</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="" style={{ display: 'none' }}>
            <div className="container mt-4 mb-4 d-none d-md-block">
              <p className="caption font-15">
                Located in the southwest of India and Sri Lanka in Indian Ocean, Maldives is a
                mesmerising island country. And to help newlyweds enjoy what this country has in
                store there are several Maldives honeymoon packages designed to bring the best out
                of Maldives. Set off for a honeymoon tour to this tropical haven of spellbinding
                beaches and an archipelago of thousands of coral islands for an unmatchable
                experience that one would have ever had.
              </p>

              <div className="more-content" style={{ display: 'none' }}>
                <h5>Best-Selling Maldives Honeymoon Packages</h5>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Top Maldives Honeymoon Packages</th>
                        <th>Duration</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Exciting Maldives Honeymoon</td>
                        <td>3 Nights/4 Days</td>
                        <td>
                          <a href="">View Details</a>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Adventurous Maldives Honeymoon</td>
                        <td>3 Nights/4 Days</td>
                        <td>
                          <a href="">View Details</a>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Pocket Friendly Maldives&nbsp;Honeymoon&nbsp;</td>
                        <td>4 Nights/5 Days</td>
                        <td>
                          <a href="">View Details</a>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Idyllic Maldives Honeymoon</td>
                        <td>4 Nights/5 Days</td>
                        <td>
                          <a href="">View Details</a>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Romantic Maldives Honeymoon</td>
                        <td>4 Nights/5 Days</td>
                        <td>
                          <a href="">View Details</a>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Deluxe Water Villa Maldives Honeymoon</td>
                        <td>5 Nights/6 Days</td>
                        <td>
                          <a href="">View Details</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h5> Best Time to Book Maldives Packages for Couples </h5>

                <p className="caption font-15">
                  A tropical nation located in the Indian Ocean, the Maldives is composed of 26
                  ring-shaped atolls made up of more than 1000 coral islands. The pristine white
                  sandy beaches, mesmerizing extensive coral reefs, and the glittering blue lagoons
                  enrich the beauty of this destination even more. Being a tropical nation and due
                  to its location in the Indian Ocean, the weather is generally hot and humid
                  throughout the year. However, the Maldives packages for couples can be booked
                  during a time when the weather isn’t that hot and the activities at this island
                  nation can be enjoyed to the most. The key is to plan and a book a honeymoon
                  vacation a couple of months before the actual vacation. This is because other
                  travelers might also be planning a holiday or a honeymoon vacation around the same
                  time making the prices shoot up for the accommodation and other activities and
                  sightseeing. The best time to visit the Maldives is during the months from
                  November to April. The monsoon fall between the months of May to October. The
                  month of June experiences the heaviest rainfall making everything gloomy, unlike
                  the usual sunny demeanour of the Maldives. Such differences in weather also decide
                  the peak and the low seasons for travelers coming to this gorgeous beach
                  destination. Since the months from December to March are comparatively dryer than
                  the whole year long, this is when the influx of the tourists is the highest.
                  During this peak season, the accommodation costs at almost all of the hotels and
                  resorts are at their all time high. This is also when the chances of availing the
                  discounts are almost negligible. The costs can be brought under your budget if you
                  plan your holiday way before the actual date of the trip. This also won’t assure
                  great discounts. The honeymooners looking to enjoy a budgeted vacation can book
                  during the low seasons. Carry your rainfall essentials and experience the magic of
                  the Maldives in the off season.
                </p>

                <h5> Best Time to Book Maldives Packages for Couples </h5>
                <ul className="pl-0">
                  <li>
                    <strong>Mirihi Islands:</strong>Nestled in the Alif Dhaal Atoll, this is the
                    first tourist island with overwater bungalows in the Maldives. Come here for the
                    love of complete detoxing environment, and have an amazing sojourn as the resort
                    30 water villas and some island resorts to offer for accommodation. Choose to go
                    for an Adam and Eve spa treatment with your partner, or indulge in adventure
                    while partaking in activities, like: snorkelling and diving.
                  </li>
                  <li>
                    <strong>Hulhumale:</strong> Replete with white sand and glimpses of blue waters,
                    Hulhumale Beach is one of the best places to have a visit to on a Maldivian
                    tour. As the beach is quite accessible from the airport, here one can cherish a
                    morning or evening walk in a safe and secure environment.
                  </li>
                  <li>
                    <strong>Maafushi Island:</strong> Nestled in the South Male Atoll in Maldives,
                    Maafushi Island is one of the biggest island of the country. Dotted with
                    splendid resorts, sparkling waters, and white sandy beaches offering thrilling
                    activities, such as diving, snorkelling, and night fishing along with sun
                    bathing, here one have a wonderful sojourn to remember for life.
                  </li>
                  <li>
                    <strong>Grand Friday Mosque:</strong> Visit to this striking white-marbled
                    mosque with a golden dome on a tour to Maldives for its exquisite architecture
                    that is spellbinding. Crammed with thousands of worshippers, this place
                    accommodates a library, conference hall, and a classroom.
                  </li>
                </ul>
              </div>
              <div className="col-md-12 mb-4 text-right">
                <a href="#!" className="read-more">
                  Read More +
                </a>
                <a href="#!" className="read-less" style={{ display: 'none' }}>
                  Read Less -
                </a>
              </div>
            </div>
            {tourListData && !tourListData.isError ? (
              <div className="container mt-4 mb-2">
                <div className="main-tags">
                  {tourListData.tourFilter.tourTypeList
                    ? tourListData.tourFilter.tourTypeList.map(tagType => (
                        <a
                          href="#!"
                          className="btn btn-outline-secondary btn-sm mb-2 mr-2"
                          key={Math.random()}
                        >
                          {tagType.name}
                        </a>
                      ))
                    : ''}
                  {tourListData.tourFilter.tourActivityTypeList
                    ? tourListData.tourFilter.tourActivityTypeList.map(tagType => (
                        <a
                          href="#!"
                          className="btn btn-outline-secondary btn-sm mb-2 mr-2"
                          key={Math.random()}
                        >
                          {tagType.name}
                        </a>
                      ))
                    : ''}
                  {tourListData.tourFilter.tourTagTypeList
                    ? tourListData.tourFilter.tourTagTypeList.map(tagType => (
                        <a
                          href="#!"
                          className="btn btn-outline-secondary btn-sm mb-2 mr-2"
                          key={Math.random()}
                        >
                          {tagType.name}
                        </a>
                      ))
                    : ''}
                </div>
              </div>
            ) : (
              ''
            )}
            {/* <div className="container-fluid hideme">
              <div className="profile-timeline-card mb-0">
                <div className="row">
                  <div className="col-md-2 hideme" >
                    <div className="">
                      <div className="p-2 d-md-none filter-fixed w-100">
                        <a href="#!" className="btn btn-sm btn-no-color float-right p-1 filter mt-1" style={{lineHeight: "0.5;"}}>Reset</a>
                        <a className="filter"> <i className="fa fa-filter"></i> Filter </a>
                      </div>
                      <div className="d-md-block d-none">
                      <a href="#!" className="btn btn-sm btn-no-color float-right p-1 mt-1" style={{ lineHeight: "0.5;" }}>Reset</a>
                        <a className="text-black"> <i className="fa fa-filter text-black"></i> Filter </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <p className="text-center font-15 mb-0 mt-1">We found <b> 50 </b> out of <b> 100 </b> wonderful Tour(s) for you</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="section-white pt-0 bg-transparent">
            <div className="container">
              <div className="row mb-4">
                {/*  <div className="col-md-2 w-100 pr-md-2">
                                    <div className="w-100 d-md-block d-none">
                                      <div className="profile-timeline-card p-2">
                                        <div className="border-bottom tl-text mb-2 mt-1 font-weight-bold">Tour Tag</div>
                                        <div className="custom-control custom-checkbox pl-0">
                                          <label><input type="checkbox" className="mr-2" />Cultural Tours</label>
                                </div>


                                          <div className="border-bottom tl-text mb-2 mt-1 font-weight-bold">Tour Activity</div>
                                          <div className="custom-control custom-checkbox pl-0">
                                            <label><input type="checkbox" className="mr-2" />Historical Tours</label>
                                </div>

                                            <div className="border-bottom tl-text mb-2 mt-1 font-weight-bold">Tour Type</div>
                                            <div className="custom-control custom-checkbox pl-0">
                                              <label><input type="checkbox" className="mr-2" />Family Packages</label>
                                </div>


                                              <div className="border-bottom tl-text mb-2 mt-1 font-weight-bold">Tour Amenity</div>
                                              <div className="custom-control custom-checkbox pl-0">
                                                <label><input type="checkbox" className="mr-2" />Activity</label>
                                </div>


                                                <div className="border-bottom tl-text mb-2 mt-1 font-weight-bold">Tour Location</div>
                                                <div className="custom-control custom-checkbox pl-0">
                                                  <label><input type="checkbox" className="mr-2" />Delhi Tourism</label>
                                </div>


                                                  <div className="border-bottom tl-text mb-2 mt-1 font-weight-bold">Tour Rating</div>
                                                  <div className="custom-control custom-checkbox pl-0">
                                                    <label><input type="checkbox"/>
                                                      <div className="float-right ml-2">
                                                        <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                      </div>
                                </label>
                                </div>
                                                    <div className="custom-control custom-checkbox pl-0">
                                                      <label><input type="checkbox"/>
                                                        <div className="float-right ml-2">
                                                          <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                          <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                        </div>
                                </label>
                                </div>
                                                      <div className="custom-control custom-checkbox pl-0">
                                                        <label><input type="checkbox"/>
                                                          <div className="float-right ml-2">
                                                            <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                            <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                            <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                          </div>
                                </label>
                                </div>
                                                        <div className="custom-control custom-checkbox pl-0">
                                                          <label><input type="checkbox"/>
                                                            <div className="float-right ml-2">
                                                              <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                              <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                              <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                              <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                            </div>
                                </label>
                                </div>
                                                          <div className="custom-control custom-checkbox pl-0">
                                                            <label><input type="checkbox"/>
                                                              <div className="float-right ml-2">
                                                                <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                                <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                                <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                                <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                                <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                              </div>
                                </label>
                                </div>



                                                            <div className="border-bottom tl-text mb-2 mt-2 font-weight-bold">Price Range</div>
                                                            <div className="custom-control custom-checkbox pl-0">
                                                              <label><input type="checkbox" className="mr-2" />Rs 0 - 999</label>
                                </div>

                                                              <div className="border-bottom tl-text mb-2 mt-2 font-weight-bold">Filter By Title</div>
                                                              <input type-text className="form-control" placeholder="Filter By Title"/>
                                                                <div className="border-bottom tl-text mb-2 mt-2 font-weight-bold">Filter By Description</div>
                                                                <input type-text className="form-control" placeholder="Filter By Description"/>
                            </div>
                        </div>
                                                            </div> */}
                {tourListData && !tourListData.isError && tourListData.tourList ? (
                  <div className="col-md-12 pl-md-2">
                    {tourListData.tourList.map(tourDetail => (
                      <div className="profile-timeline-card" key={Math.random()}>
                        <div className="">
                          <div className="row">
                            <div className="col-md-3">
                              <div
                                className="bg-primary px-2 text-white float-right font-18 mt-3 border-radius-25"
                                style={{
                                  position: 'absolute',
                                  left: '30px',
                                  boxShadow: '0px 0px 20px 4px #fff'
                                }}
                              >
                                {tourDetail.tourData.tourMonthlyPrice.startingDisountPrice}% off
                              </div>
                              <a href="">
                                {' '}
                                <img
                                  className="trip-timeline-image border-radius-15 img-fluid"
                                  src={
                                    tourDetail.imageHeaderData != undefined
                                      ? tourDetail.imageHeaderData.imageURL
                                      : 'img/s4.jpg'
                                  }
                                />{' '}
                              </a>
                              <div className="post-bar single-post">
                                <div className="bar-content">
                                  <small className="p-4 mt-2">
                                    Share This Best Deals With Friends
                                  </small>

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
                              </div>
                            </div>
                            <div className="col-md-6">
                              <h5 className="card-title mb-2 mt-2">
                                <a href="" className="text-dark font-18 font-weight-bold">
                                  {' '}
                                  {tourDetail.tourData.title}
                                </a>
                              </h5>
                              <div className="text-success font-14 mt-2" style={{ padding: '0px' }}>
                                <p>
                                  {' '}
                                  <i className="fa fa-moon-o text-primary"></i>{' '}
                                  {tourDetail.tourData.days - 1} Nights/{' '}
                                  <i className="fa fa-sun-o text-warning"></i>{' '}
                                  {tourDetail.tourData.days} Days{' '}
                                </p>
                              </div>
                              {tourDetail.locationData ? (
                                <div
                                  className="text-success font-14 mt-2"
                                  style={{ padding: '0px' }}
                                >
                                  <p>
                                    {tourDetail.locationData.city
                                      ? tourDetail.locationData.city
                                      : ''}
                                    {tourDetail.locationData.city ? ',' : ''}{' '}
                                    {tourDetail.locationData.country}
                                  </p>
                                </div>
                              ) : (
                                ''
                              )}

                              {/* <div className="text-danger font-14 mt-2 font-weight-bold" style={{padding: "0px"}}> Himachal Pradesh </div> */}
                              <p
                                className="text-muted font-14 two-line-text"
                                dangerouslySetInnerHTML={{
                                  __html: tourDetail.tourData.desc ? tourDetail.tourData.desc : ''
                                }}
                              ></p>
                              <div className="mt-2 pt-2 mb-2 border-top">
                                {tourDetail.tourData.tourTypeList
                                  ? tourDetail.tourData.tourTypeList.map(tourType => (
                                      <a href="" className="tag mr-1" key={Math.random()}>
                                        <span className="badge badge-pill badge-info text-white border-radius-25 font-12 pl-2 pr-2 p-1">
                                          {tourType.name}
                                        </span>
                                      </a>
                                    ))
                                  : ''}
                              </div>
                              <div className="mt-2 pt-2 mb-2 border-top">
                                {tourDetail.tourData.tourTagTypeList
                                  ? tourDetail.tourData.tourTagTypeList.map(tourTagType => (
                                      <a href="" className="tag mr-1" key={Math.random()}>
                                        <span className="badge badge-pill badge-info text-white border-radius-25 font-12 pl-2 pr-2 p-1">
                                          #{tourTagType.name}
                                        </span>
                                      </a>
                                    ))
                                  : ''}
                              </div>
                              <div className="mt-2 pt-2 mb-2 border-top">
                                {tourDetail.tourData.tourActivityTypeList
                                  ? tourDetail.tourData.tourActivityTypeList.map(
                                      tourActivityType => (
                                        <a href="" className="tag mr-1" key={Math.random()}>
                                          <span className="badge badge-pill badge-info text-white border-radius-25 font-12 pl-2 pr-2 p-1">
                                            {tourActivityType.name}
                                          </span>
                                        </a>
                                      )
                                    )
                                  : ''}
                              </div>
                              <div className="">
                                <h5 className="border-bottom pb-2 mt-3">Inclusions</h5>
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
                            <div className="col-md-3">
                              <div
                                className="p-2 border border-radius-15"
                                style={{ background: '#fff' }}
                              >
                                {/* <div className="float-right">
                                                                                      <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                                                      <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                                                      <i className="fa fa-star font-12 text-warning" aria-hidden="true"></i>
                                                                                      <i className="fa fa-star font-12 text-muted" aria-hidden="true"></i>
                                                                                      <i className="fa fa-star font-12 text-muted" aria-hidden="true"></i>
                                                                                    </div> */}
                                {/* <h5 className="text-dark font-weight-bold font-15"><i className="fas fa-eye text-primary"></i> 8850</h5> */}
                                <div className="text-left pt-3 pb-3 border-top">
                                  <h4 className="text-black mt-0 mb-0 font-weight-bold float-right">
                                    <del className="font-16 font-weight-normal">
                                      {' '}
                                      ₹ {tourDetail.tourData.tourMonthlyPrice.startingPrice}
                                    </del>
                                    <i className="fa fa-inr" aria-hidden="true"></i>{' '}
                                    <strong>
                                      {' '}
                                      {tourDetail.tourData.tourMonthlyPrice.startingPromoPrice}{' '}
                                    </strong>
                                  </h4>
                                  <small className="text-muted mt-2"> Starting From</small>
                                </div>
                                <div className="mt-2">
                                  <a
                                    data-toggle="modal"
                                    target="_self"
                                    href="#send-enquiry"
                                    className="btn btn-secondary btn-block"
                                  >
                                    Send Enquiry
                                  </a>
                                </div>
                                <div className="mt-2">
                                  <a
                                    className="btn btn-no-color btn-block"
                                    href={`/packages/${tourDetail.tourData.tourCode}`}
                                  >
                                    View Details
                                  </a>
                                </div>
                                <div
                                  className="mt-2 p-2 text-black text-center"
                                  style={{ border: '1px dashed #000', borderRadius: '25px' }}
                                >
                                  Tour Code : {tourDetail.tourData.tourCode}
                                </div>
                                <div className="mt-2 text-center">
                                  <small className="text-muted mt-2"> Talk To an Expert </small>
                                  <a href="tel:9716159716" className="btn btn-info btn-block">
                                    <i className="fas fa-phone fa-rotate-90"></i> +91 9716159716
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  'No Tours Found'
                )}
              </div>
            </div>
          </div>
          {allSliderData &&
          allSliderData.allSliderData &&
          allSliderData.allSliderData.allWebSliderList ? (
            <AllSlider allSliderData={allSliderData.allSliderData}></AllSlider>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  };
  const { articles, location, match } = props;

  const metaTitle = seoDetail
    ? seoDetail.title
    : `Touroxy : Your Best Website and Business Solution`;
  const metaDesc = seoDetail ? seoDetail.metaKeyword : '';
  const keyword = seoDetail ? seoDetail.metaDescription : '';

  useEffect(() => {
    window.scrollTo(0, 0);
    // loadTourList();
  }, []);
  return (
    <div key={Math.random()}>
      {MetaTags.getAppMetaTags(seoDetail)(metaTitle, metaDesc, location.pathname, '', keyword)}
      {/* { {modal ? <ArticleDetailModal handler={closeModal} data={currentArticle} /> : null}} */}
      {renderArticles()}
    </div>
  );
};

const mapStateToProps = (state, _ownProps) => {
  // console.log(state.tourListData);
  return {
    tourListData: state.tourListData,
    websiteSetting: state.websiteSetting,
    
    websiteMenu: state.websiteMenu
  };
};

const loadData = (store, param) => {
  return Promise.all([
    store.dispatch(fetchTourList()),
    
    store.dispatch(fetchWebsiteMenuList()),
    store.dispatch(fetchWebsiteSetting())
  ]);
};

TourList.propTypes = {
  tourListData: PropTypes.objectOf(PropTypes.any),
  fetchTourList: PropTypes.func,
  websiteMenu: PropTypes.objectOf(PropTypes.any),
  websiteSetting: PropTypes.objectOf(PropTypes.any),
  
  fetchWebsiteMenuList: PropTypes.func,
  fetchWebsiteSetting: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any)
};

TourList.defaultProps = {
  tourListData: [],
  fetchTourList: null,
  
  websiteMenu: null,
  websiteSetting: null,
  
  fetchWebsiteMenuList: null,
  fetchWebsiteMenuList: null,
  location: null,
  match: null
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMountDispatch() {
    dispatch(fetchTourList()), 
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
  component: connect(mapStateToProps, mapDispatchToProps, mergeProps)(TourList),
  loadData
};
