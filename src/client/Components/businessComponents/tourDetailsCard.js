import React, { useEffect, useState } from 'react';

const TourDetailsCard = props => {
  const [tourDetail, setTourDetail] = useState(props.tourDetail);
  // console.log('*********************************************');
  // console.log('\nTour Details are : \n\n' + tourDetail.tourData + '\n');
  // console.log('*********************************************');
  return (
    <div className="tourDetailCard">
      <div className="row">
        <div className="col-md-3">
          <div
            className="bg-primary px-2 text-white float-right font-18 mt-3 border-radius-25"
            style={{
              position: 'absolute',
              left: '30px',
              boxShadow: '0px 0px 20px 4px #fff'
            }}
          ></div>
          <a href="">
            <img
              className="trip-timeline-image border-radius-15 img-fluid"
              src={
                tourDetail.imageHeaderData && tourDetail.imageHeaderData.imageURL
                  ? tourDetail.imageHeaderData.imageURL
                  : 'img/s4.jpg'
              }
            />
          </a>
          <div className="post-bar single-post">
            <div className="bar-content"></div>
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
              <i className="fa fa-moon-o text-primary"></i> {tourDetail.tourData.days - 1} Nights/{' '}
              <i className="fa fa-sun-o text-warning"></i> {tourDetail.tourData.days} Days{' '}
            </p>
          </div>
          {tourDetail.locationData ? (
            <div className="text-success font-14 mt-2" style={{ padding: '0px' }}>
              <p>
                {tourDetail.locationData.city ? tourDetail.locationData.city : ''}
                {tourDetail.locationData.city ? ',' : ''} {tourDetail.locationData.country}
              </p>
            </div>
          ) : (
            ''
          )}
          {tourDetail.tourData.highlight ? (
            <p
              className="text-muted font-14 two-line-text"
              dangerouslySetInnerHTML={{
                __html: tourDetail.tourData.highlight ? tourDetail.tourData.highlight : ''
              }}
            ></p>
          ) : (
            ''
          )}
          <div className="mt-2 pt-2 mb-2">
            {tourDetail.tourData.tourTypeList
              ? tourDetail.tourData.tourTypeList.map(tourType => (
                  <a href="" className="tag mr-1" key={Math.random()}>
                    <span className="badge badge-pill badge-info text-white border-radius-25 font-12 pl-2 pr-2 p-1">
                      {tourType.name}
                    </span>
                  </a>
                ))
              : ''}
            {tourDetail.tourData.tourTagTypeList
              ? tourDetail.tourData.tourTagTypeList.map(tourTagType => (
                  <a href="" className="tag mr-1" key={Math.random()}>
                    <span className="badge badge-pill badge-info text-white border-radius-25 font-12 pl-2 pr-2 p-1">
                      #{tourTagType.name}
                    </span>
                  </a>
                ))
              : ''}
            {tourDetail.tourData.tourActivityTypeList
              ? tourDetail.tourData.tourActivityTypeList.map(tourActivityType => (
                  <a href="" className="tag mr-1" key={Math.random()}>
                    <span className="badge badge-pill badge-info text-white border-radius-25 font-12 pl-2 pr-2 p-1">
                      {tourActivityType.name}
                    </span>
                  </a>
                ))
              : ''}
          </div>
          {tourDetail.tourData.tourAmenityList ? (
            <div className="">
              <h5 className="border-bottom pb-2 mt-3">Inclusions</h5>
              <ul className="d-inline-flex pl-0 font-12">
                {tourDetail.tourData.tourAmenityList
                  ? tourDetail.tourData.tourAmenityList.map(tourAmenity => (
                      <li className="pl-2 pr-2 text-center list-unstyled" key={Math.random()}>
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
        </div>
        <div className="col-md-3">
          <div className="p-2" style={{ background: '#fff' }}>
            <div className="text-right pt-3 pb-3">
              <h4 className="text-black mt-0 mb-0 font-weight-bold text-center">
                {tourDetail.tourData.tourMonthlyPrice &&
                tourDetail.tourData.tourMonthlyPrice.startingPrice ? (
                  <>
                    <small className="text-muted mt-2"> Starting From &nbsp; &nbsp; :</small>
                    <i className="fa fa-inr" aria-hidden="true"></i>
                  </>
                ) : (
                  ''
                )}
                {tourDetail.tourData.tourMonthlyPrice &&
                tourDetail.tourData.tourMonthlyPrice.startingPrice ? (
                  <strong>{tourDetail.tourData.tourMonthlyPrice.startingPrice}</strong>
                ) : (
                  ''
                )}
              </h4>
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
            {tourDetail.tourData.tourCode ? (
              <div className="mt-2">
                <a
                  className="btn btn-no-color btn-block"
                  href={`/packages/${tourDetail.tourData.tourCode}`}
                >
                  View Details
                </a>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsCard;
