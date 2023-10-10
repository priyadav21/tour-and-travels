import React, { useState, useEffect, useCallback } from 'react';
import LeadFormUser from '../../pages/leadForm';
// import SocialFooterLink from '../util/socialFooterLink';

function Footer(props) {
  const [websiteMenuFooter, setWebsiteMenuFooter] = useState(props.websiteMenuFooter);
  const [websiteMenuFooterRight, setWebsiteMenuFooterRight] = useState(
    props.websiteMenuFooterRight
  );
  const [websiteSetting, setWebsiteSetting] = useState(props.websiteSetting);
  const [menuOpen, setMenuToggle] = useState(false);
  const toggleMenu = () => setMenuToggle(!menuOpen);

  const stylesOpen = {
    transform: 'translateX(0px)'
  };

  let websiteSettingMain =
    websiteSetting &&
    websiteSetting.websiteSetting &&
    websiteSetting.websiteSetting.websiteSettingMain
      ? websiteSetting.websiteSetting.websiteSettingMain
      : null;
  let webSocial =
    websiteSettingMain && websiteSettingMain.websiteSettingSocial
      ? websiteSettingMain.websiteSettingSocial
      : null;
  let webtheme =
    websiteSettingMain && websiteSettingMain.websiteSettingTh
      ? websiteSettingMain.websiteSettingTh
      : null;
  let footerShow = webtheme && webtheme.footerShow ? webtheme.footerShow : null;
  const mainFooterClr = {
    backgroundColor:
      webtheme && webtheme.mainFooterClr ? webtheme.mainFooterClr + '!important' : '',
    color: webtheme && webtheme.mainFooterTxtClr ? webtheme.mainFooterTxtClr + '!important' : ''
  };
  const bottomFooterClr = {
    backgroundColor:
      webtheme && webtheme.bottomFooterClr ? webtheme.bottomFooterClr + '!important' : ''
  };
  const logoFooterUrl =
    websiteSettingMain && websiteSettingMain.footerLogo ? websiteSettingMain.footerLogo : null;

  const leftFooter =
    '<li><a href="/about-us">About us</a></li><li><a href="/terms-and-conditions">Terms and Conditions</a></li><li><a href="/privacy-policy">Privacy Policy</a></li><li><a href="/contact-us">Contact us</a></li><li style="display:none"><a href="/app">Apps</a></li>';
  useEffect(
    () => {
      setWebsiteMenuFooter(props.websiteMenuFooter);
      setWebsiteMenuFooterRight(props.websiteMenuFooterRight);
    },
    [props.websiteMenuFooter],
    [props.websiteMenuFooterRight]
  );
  return (
    <div className={webtheme.footerTemplate == 'STYLE_2_1' ? 'btm-footer pt-5' : ''}>
      {webSocial.website == 'https://touroxy.com' ? (
        <img src="/img/footer-img2.png" className="img-fluid" />
      ) : (
        ''
      )}
      {footerShow ? (
        <>
          {webtheme.footerTemplate == 'STYLE_1' ? (
            <footer style={mainFooterClr} data-style={webtheme.footerTemplate}>
              <div className="container">
                <div className="row">
                  {websiteMenuFooter ? (
                    <div className="col-sm-3 p-3">
                      {logoFooterUrl ? <img src={logoFooterUrl} width="150px" /> : ''}
                    </div>
                  ) : (
                    ''
                  )}
                  {/* </div> 
            <div className="row"> */}
                  {websiteMenuFooter ? (
                    <div className="col-sm-6 p-3">
                      <div className="footer-link">
                        <ul>
                          {websiteMenuFooter
                            ? websiteMenuFooter.map(websiteMenuContent => (
                                <li key={Math.random()}>
                                  <a href={`${websiteMenuContent.link}`}>
                                    {' '}
                                    {websiteMenuContent.name}
                                  </a>
                                </li>
                              ))
                            : { leftFooter }}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                  {websiteMenuFooterRight ? (
                    <div className="col-sm-6 p-3">
                      <div className="footer-link">
                        <ul>
                          {/* <h5 className="text-white"> Suppliers</h5> */}
                          {websiteMenuFooterRight
                            ? websiteMenuFooterRight.map(websiteMenuContent => (
                                <li key={Math.random()}>
                                  <a href={`${websiteMenuContent.link}`}>
                                    {' '}
                                    {websiteMenuContent.name}
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
                  {/* <div className="col-sm-4 p-3">
              <div className="footer-link">
                <ul>
                  <h5 className="text-white">Accreditations</h5>
                  <li>
                    <a href="/list-your-activities" className="">
                      List Your Activities
                    </a>
                  </li>
                  <li>
                    <a href="/earn-with-touroxy" className="">
                      Earn With Touroxy
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
                </div>
              </div>
              <div className="footer_bottom text-center" style={bottomFooterClr}>
                <div className="row m-0">
                  <div className="col-md-4">
                    <p className="text-white mb-0 font-14">
                      © 2023 &nbsp;
                      <a href={webSocial.website} style={{ color: 'white' }} target="_blank">
                        {websiteSettingMain && websiteSettingMain.name
                          ? websiteSettingMain.name
                          : ''}
                      </a>
                      &nbsp; All rights reserved
                    </p>
                  </div>
                  <div className="col-md-4">
                    {/* {webSocial.active ? <SocialFooterLink webSocial={webSocial} /> : ''} */}
                  </div>
                  <div className="col-md-4 ">
                    <p className="text-white mb-0 font-16 float-right">
                      {/* with <i className="fas fa-heart text-danger"></i> from{' '} */}
                      Powered By &nbsp;
                      {webSocial.website == 'https://yujik.com' ? (
                        <a
                          href={'https://yujik.com'}
                          className=""
                          style={{ color: 'white' }}
                          target="_blank"
                        >
                          Yujik
                        </a>
                      ) : (
                        <a href="https://yujik.com" style={{ color: 'white' }} target="_blank">
                          Yujik
                        </a>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          ) : (
            ''
          )}
          
        </>
      ) : (
        ''
      )}
      <div
        className="modal fade bd-example-modal-lg pr-0"
        id="send-enquiry"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header pt-3 pb-2 mb-3" style={{ zIndex: '10' }}>
              <h3 className="caption text-black font-weight-bolder font-20 text-left mb-2">
                Tell us something about your Plan
              </h3>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {/* <div className="row card-row-set mb-2">
                <div className="col-md-12">
                  We understand current Covid Situtaion. We will make every effort to secure your
                  jounery and keep you safe.
                </div>
              </div> */}
              <div className="row card-row-set">
                <div className="col-md-12">
                  <LeadFormUser />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--popup-END--> */}
    </div>
  );
}
export default Footer;
