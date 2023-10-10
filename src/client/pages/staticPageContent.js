import React, { useState, useEffect, useCallback } from 'react';

function StaticPageContent(props) {
    const [postData, setPostData] = useState(props.data);
    const [websiteSection, setWebsiteSection] = useState();

    useEffect(() => {
        setPostData(props.data);
        setWebsiteSection(postData.websiteContent.websiteSection);
    }, [props.data]);

    return (
      <div className="container-fluid row mobile-top-padding mobile-text-center min-container-height">
        <div className="content col-md-6 col-12 mb2 mobile-text-center">
          <div className="content-wrapper">
            <div className="content-header row">
              <div className="content-header-left col-md-12 col-12 mb-2">
                <div className="content-header-title mb-0 white">
                  {/* <img aria-label="United States of America" src="flags/earth.svg" 
                                style={{display: "inline-block", width: "1em", height: "1em", verticalAlign: "middle", fontSize: "4em", lineHeight: "4em"}}/> */}
                  <h3></h3>{' '}
                  <small>
                    {' '}
                    <i></i>
                  </small>
                </div>
              </div>
            </div>
            <div className="content-header-right col-md-6 col-12 mb-md-0 mb-2"></div>
          </div>
          <div className="row">
            
          </div>
        </div>
      </div>
    );
}
export default StaticPageContent