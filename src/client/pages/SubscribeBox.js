import React, { useEffect, useState } from 'react';
import config from '../../../config';

function SubscribeBox(props) {
  const [websiteSettingMain, setWebsiteSettingMain] = useState(props.websiteSettingMain);
  return (
    <div className="section-white  border-top">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="font-25 font-weight-bold mb-0">
              {websiteSettingMain.subscribeHeading?
                websiteSettingMain.subscribeHeading
              :'Get Best Deals Directly in Your Inbox Today !'}
            </p>
            <p className="font-18 font-weight-500">
              {websiteSettingMain.subscribeDesc?
                websiteSettingMain.subscribeDesc
              :'We deliver every deal from our partners as it appears'}
            </p>
          </div>
          <div className="col-md-6">
            <form role="form" id="frmSubscribe" name="formName">
            <div className="form-group subscribe" style={{ marginBottom: '0rem' }}>
              
              <input
                type="text"
                name="email"
                id="subscriberEmail"
                placeholder="Your email address"
                className="form-control form-control-lg"
                required="required"
              />
              <input type="hidden" name="appKey" id="appKey" value={config.apiKey} />
                <input type="hidden" name="source" id="source" value="subscribe_web" />
              <input type="hidden" name="userRoleType" id="userRoleType" value={config.custRoleTyCd} />
              <input type="hidden" name="leadType" id="leadType" value={config.leadType} />
              <input type="hidden" name="service" id="service" value="subscribe" />
              {/* <!-- <a href="#" className="btn text-white"></a> --> */}
              <input
                type="submit"
                id="subscribeMail"
                className="btn btn-no-color"
                value="Subscribe"
              />
            </div>
            </form>
            <div id="subscribe_div_msg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SubscribeBox;