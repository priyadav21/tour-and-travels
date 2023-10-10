import { Link } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import SocialFooterLink from '../util/socialFooterLink';
import SocialFooterLinkWithText from '../util/socialFooterLinkWithText';
import { formatMenuLink } from '../../Utils/utilCommon';

function Header(props) {
  const [pageType, setPageType] = useState(props.pageType);
  const [websiteMenuLeft, setWebsiteMenuLeft] = useState(props.websiteMenuLeft);
  const [websiteMenuRight, setWebsiteMenuRight] = useState(props.websiteMenuRight);
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

  const mainHeaderClr = {
    backgroundColor:
      webtheme && webtheme.mainHeaderClr ? webtheme.mainHeaderClr + '!important' : '',
    color: webtheme && webtheme.mainHeaderTxtClr ? webtheme.mainHeaderTxtClr + '!important' : ''
  };
  const mainHeaderTxtClr = {
    color: webtheme && webtheme.mainHeaderTxtClr ? webtheme.mainHeaderTxtClr + '!important' : ''
  };
  const mainHeaderTxtHoverClr = {
    color:
      webtheme && webtheme.mainHeaderTxtHoverClr
        ? webtheme.mainHeaderTxtHoverClr + '!important'
        : ''
  };
  const logoUrl = websiteSettingMain && websiteSettingMain.logo ? websiteSettingMain.logo : '';
  const mobileLogo =
    websiteSettingMain && websiteSettingMain.mobileLogo ? websiteSettingMain.mobileLogo : '';

  useEffect(() => {
    setWebsiteMenuLeft(props.websiteMenuLeft);
  }, [props.websiteMenuLeft]);
  return (
    <>
      {webtheme ? (
        <>
          <div className="sidebar-show" style={{ left: '-100%' }}>
            <div className="sliderbgclass">
              <button id="sidebar-close-btn" type="button" className="close" aria-label="Close">
                <span aria-hidden="true" style={{ fontSize: '35px' }}>
                  ×
                </span>
              </button>
              <div className="border-bottom-white">
                <img className="img-fluid pt-2 pl-2" src={logoUrl} />
              </div>
              <div className="row col-md-12 p-3 ml-0">
                {websiteMenuLeft
                  ? websiteMenuLeft.map((websiteMenuContent, outerIndex) =>
                      websiteMenuContent.childMenuList ? (
                        <>
                          <li className="mt-3 col-md-12 accordion-li">
                            <a
                              className="accordion"
                              data-toggle="collapse"
                              data-parent="#accordion"
                              style={mainHeaderTxtClr}
                              href={`#${
                                websiteMenuContent.childMenuList ? 'collapse' + outerIndex : ''
                              }`}
                            >
                              <span className="text-muted">{websiteMenuContent.name}</span>
                            </a>
                          </li>
                          <ul
                            id={`${
                              websiteMenuContent.childMenuList ? 'collapse' + outerIndex : ''
                            }`}
                            className="panel-collapse accordion-ul collapse in w-100 spysr-bg-color mt-2"
                          >
                            {websiteMenuContent.childMenuList
                              ? websiteMenuContent.childMenuList.map(websiteMenuContentInner => (
                                  <li className="mb-2" key={Math.random()}>
                                    <a
                                      className="text"
                                      href={`${
                                        websiteMenuContentInner.link
                                          ? formatMenuLink(websiteMenuContentInner.link)
                                          : '/'
                                      }`}
                                      style={mainHeaderTxtClr}
                                    >
                                      <span className="side-link">
                                        {websiteMenuContentInner.name}
                                      </span>
                                    </a>
                                  </li>
                                ))
                              : ''}
                          </ul>
                        </>
                      ) : (
                        <a
                          href={
                            websiteMenuContent.link ? formatMenuLink(websiteMenuContent.link) : '/'
                          }
                          className="mt-3 col-md-12"
                        >
                          <span className="text-muted"> {websiteMenuContent.name}</span>
                        </a>
                      )
                    )
                  : ''}
                <a
                  data-toggle="modal"
                  data-target="#send-enquiry"
                  className="btn spysr-btn my-2 my-sm-0 btn-block"
                >
                  GET A QUOTE
                </a>
                {/* <div className="mx-auto hidden">
              <a href="https://www.facebook.com/spysr.web/" style={{ textDecoration: 'none' }}> <i className="fab fa-facebook-f social-icon mr-2"></i> </a>
              <a href="https://twitter.com/spysr" style={{ textDecoration: 'none' }}> <i className="fab fa-twitter social-icon mr-2"></i> </a>
              <a href="https://www.linkedin.com/company/spysr/" style={{ textDecoration: 'none' }}> <i className="fab fa-linkedin-in social-icon mr-2"></i> </a>
            </div> */}
              </div>
            </div>
          </div>
          {/* white background full left logo */}
          {webtheme.headerTemplate == 'STYLE_2' ? (
            <nav
              className="navbar1 navbar-expand-lg navbar-light"
              style={mainHeaderClr}
              data-header-style={webtheme.headerTemplate}
            >
              <div className="d-flex">
                <a className="navbar-brand" href="/">
                  <img className="img-fluid" src={logoUrl} />
                  {/* <p className="bold font-14">{websiteSettingMain.tagLine}</p> */}
                </a>
                {websiteSettingMain.mobile && webtheme.whatsappBtnHeader ? (
                  <div className="d-flex whatswidget-widget-wrapper-head">
                    <a
                      href={`https://api.whatsapp.com/send?phone=${websiteSettingMain.mobile}&text=Hi`}
                      className="float"
                      target="_blank"
                    >
                      <div
                        className="whatswidget-button"
                        id="whatswidget-button"
                        style={{ all: 'revert' }}
                      >
                        <div style={{ margin: '0 auto', width: '38.5px', all: 'revert' }}>
                          <img
                            className="whatswidget-icon"
                            style={{ all: 'revert' }}
                            src="/img/icon/wpwhite.png"
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent2"
                aria-controls="navbarSupportedContent2"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent2">
                <ul className="navbar-nav mr-auto">
                  {websiteMenuLeft
                    ? websiteMenuLeft.map((websiteMenuContent, outerIndex) => (
                        <li
                          className={`nav-item ${
                            websiteMenuContent.childMenuList ? 'dropdown' : ''
                          }`}
                          key={Math.random()}
                        >
                          <a
                            className={`nav-link ${
                              websiteMenuContent.childMenuList ? 'dropdown-toggle' : ''
                            }`}
                            style={mainHeaderTxtClr}
                            href={`${
                              websiteMenuContent.childMenuList
                                ? '/'
                                : formatMenuLink(websiteMenuContent.link)
                            }`}
                            id={`${
                              websiteMenuContent.childMenuList ? 'navbarDropdown' + outerIndex : ''
                            }`}
                            role={`${websiteMenuContent.childMenuList ? 'button' : ''}`}
                            data-toggle={`${websiteMenuContent.childMenuList ? 'dropdown' : ''}`}
                            aria-haspopup={`${websiteMenuContent.childMenuList ? 'true' : ''}`}
                            aria-expanded={`${websiteMenuContent.childMenuList ? 'false' : ''}`}
                          >
                            {websiteMenuContent.name}
                          </a>
                          {websiteMenuContent.childMenuList ? (
                            <div
                              className="dropdown-menu"
                              aria-labelledby={`${
                                websiteMenuContent.childMenuList
                                  ? 'navbarDropdown' + outerIndex
                                  : ''
                              }`}
                              key={Math.random()}
                            >
                              {websiteMenuContent.childMenuList
                                ? websiteMenuContent.childMenuList.map(websiteMenuContentInner => (
                                    <a
                                      className="dropdown-item"
                                      href={`${
                                        websiteMenuContentInner.link
                                          ? formatMenuLink(websiteMenuContentInner.link)
                                          : '/'
                                      }`}
                                      style={mainHeaderTxtClr}
                                      key={Math.random()}
                                    >
                                      {websiteMenuContentInner.name}
                                    </a>
                                  ))
                                : ''}
                            </div>
                          ) : (
                            ''
                          )}
                        </li>
                      ))
                    : ''}
                </ul>

                {websiteMenuRight ? (
                  <form className="form-inline my-2 my-lg-0 ml-3">
                    {websiteMenuRight
                      ? websiteMenuRight.map(websiteMenuContent => (
                          <a
                            href={`${
                              websiteMenuContent.link
                                ? formatMenuLink(websiteMenuContent.link)
                                : '/'
                            }`}
                            className="pop-up nav-link hidden-xs pl-1"
                            key={Math.random()}
                          >
                            {' '}
                            <i className="fas fa-mobile-alt"></i>
                            {websiteMenuContent.name}
                          </a>
                        ))
                      : ''}
                    {/* <a data-toggle="modal" data-target="#send-enquiry" href="#!" className="btn spysr-btn my-2 my-sm-0 font-weight-bold font-12 px-4 py-2">START PROJECT <i className="fas fa-arrow-right ml-2"></i></a> */}
                  </form>
                ) : (
                  ''
                )}
                {/* <a href="https://api.whatsapp.com/send?phone=51955081075&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202." className="float" target="_blank">
              <i className="fa fa-whatsapp my-float"></i>
            </a> */}
                <div>
                  {websiteSettingMain.gst ? (
                    <div style={mainHeaderTxtClr} className="mb-2">
                      <span style={{ margin: '15px', fontWeight: 'bold' }}>
                        Registration Number: {websiteSettingMain.gst}
                      </span>
                    </div>
                  ) : (
                    ''
                  )}
                  {websiteSettingMain.mobile ? (
                    <>
                      <div className="d-flex right-call-header" style={{ padding: '.5em 1em' }}>
                        {webtheme.callBtnHeader ? (
                          <>
                            <span style={mainHeaderTxtClr} className="call m-2">
                              Call/DM &nbsp;
                            </span>
                            <a
                              href={`tel:${websiteSettingMain.mobile}`}
                              style={mainHeaderTxtClr}
                              className="m-2 pop-up nav-link hidden-xs pl-1 black number"
                            >
                              {websiteSettingMain.mobile}
                            </a>
                          </>
                        ) : (
                          ''
                        )}
                        {webtheme.whatsappBtnHeader ? (
                          <a
                            href={`https://api.whatsapp.com/send?phone=${websiteSettingMain.mobile}&text=Hi`}
                            target="_blank"
                          >
                            <div
                              className="whatswidget-button"
                              id="whatswidget-button"
                              style={{ all: 'revert' }}
                            >
                              <div style={{ margin: '0 auto', width: '38.5px', all: 'revert' }}>
                                <img
                                  className="whatswidget-icon"
                                  style={{ all: 'revert' }}
                                  src=" /img/icon/wpwhite.png"
                                />
                              </div>
                            </div>
                          </a>
                        ) : (
                          ''
                        )}
                        {/* <a href="https://api.whatsapp.com/send?phone=51955081075&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202." className="float" target="_blank">
                    <i className="fa fa-whatsapp my-float"></i>
                  </a> */}
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </nav>
          ) : (
            ''
          )}
          
        </>
      ) : (
        ''
      )}
    </>
  );
}

export default Header;
