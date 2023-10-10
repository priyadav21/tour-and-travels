import Helmet from 'react-helmet';
import React from 'react';
import config from '../../../config';

class MetaTags {
  static getAppMetaTags = seoDetail => {
    const favIcon = seoDetail ? seoDetail.favIcon : `${config.webUrl}img/favicon.png`;
    const wbeUrl = seoDetail && seoDetail.url ? seoDetail.url : `${config.webUrl}`;
    const coverImage = seoDetail ? seoDetail.coverImage : `${config.webUrl}img/deal2.jpg`;
    // const webUrlNoSlash = (seoDetail && seoDetail.webUrlNoSlash) ? seoDetail.webUrlNoSlash :  config.webUrlNoSlash ;
    const webUrlNoSlash = config.webUrlNoSlash;

    return (
      <Helmet>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="fragment" content="!" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index, follow" />
        <link href={favIcon} rel="icon" type="image/png"></link>
        <title>
          {seoDetail ? seoDetail.title : 'Touroxy : Your Best Website and Business Solution'}
        </title>
        <meta name="description" content={seoDetail ? seoDetail.metaDescription : ''} />
        <link rel="canonical" href={wbeUrl} />
        <meta name="keywords" content={seoDetail ? seoDetail.metaKeyword : ''} />

        <meta
          property="og:title"
          prefix="og: http://ogp.me/ns#"
          content={
            seoDetail ? seoDetail.title : 'Touroxy : Your Best Website and Business Solution'
          }
        />
        <meta
          property="og:description"
          prefix="og: http://ogp.me/ns#"
          content={seoDetail ? seoDetail.metaDescription : ''}
        />

        <meta property="og:image" prefix="og: http://ogp.me/ns#" content={coverImage} />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={
            seoDetail ? seoDetail.title : 'Touroxy : Your Best Website and Business Solution'
          }
        />
        <meta
          name="twitter:description"
          content={
            seoDetail
              ? seoDetail.metaDescription
              : 'Create a professional website with the Yujik website builder. Choose a customizable designer-made template and add the features you need. Get started today."'
          }
        />
        <meta name="twitter:image" content={coverImage} />
        <meta name="author" content="spysr" />
        <meta property="og:locale" prefix="og: http://ogp.me/ns#" content="en_US" />
        <meta property="og:type" prefix="og: http://ogp.me/ns#" content="website" />
        <meta property="og:url" prefix="og: http://ogp.me/ns#" content={wbeUrl} />
        <meta property="og:site_name" prefix="og: http://ogp.me/ns#" content={webUrlNoSlash} />
        <meta property="article:publisher" content="https://www.facebook.com/touroxy/" />

        <link href={favIcon} rel="apple-touch-icon" type="image/png" />
        <link href={favIcon} rel="apple-touch-icon" size="76x76" type="image/png" />
        <link href={favIcon} rel="apple-touch-icon" size="120x120" type="image/png" />
        <link href={favIcon} rel="apple-touch-icon" size="152x152" type="image/png" />
        <meta content={webUrlNoSlash} name="twitter:app:name:iphone" />
        <meta content={webUrlNoSlash} name="twitter:app:name:ipad" />
        <meta content="Touroxy" name="twitter:app:name:googleplay" />
        <meta content="com.touroxy" name="twitter:app:id:googleplay" />
        <meta content={webUrlNoSlash} name="twitter:site" />
        <meta content={webUrlNoSlash} name="twitter:creator" />
        <meta content="english" name="language" />

        {config.apiKey == '1TsJQAWfGEG6FsqzMR-AQ_On5Z_mzth6' ? (
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10813543025"></script>
        ) : (
          ''
        )}

        {config.apiKey == '1TsJQAWfGEG6FsqzMR-AQ_On5Z_mzth6' ? (
          <script>
            {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-10813543025');
  `}
          </script>
        ) : (
          ''
        )}
        {config.apiKey == '1TsJQAWfGEG6FsqzMR-AQ_On5Z_mzth6' ? (
          <script>
            {`
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-10813543025/ANB-CKyTxIkDEPGkpqQo',
      'event_callback': callback
  });
  return false;
}
`}
          </script>
        ) : (
          ''
        )}

        {config.apiKey == 'HcX66Se_iPTaq1K3eMxsKw' ? (
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-111561589-1"></script>
        ) : (
          ''
        )}
        {config.apiKey == 'HcX66Se_iPTaq1K3eMxsKw' ? (
          <script type="text/javascript">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'UA-111561589-1');
          `}
          </script>
        ) : (
          ''
        )}

        {config.apiKey == 'WLRSjhXffj9qw3NAMqSbq576fuzLUASfHSCb0ms62RU' ? (
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-1DW7WND7MD"></script>
        ) : (
          ''
        )}
        {config.apiKey == 'WLRSjhXffj9qw3NAMqSbq576fuzLUASfHSCb0ms62RU' ? (
          <script>
            {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-1DW7WND7MD');
  `}
          </script>
        ) : (
          ''
        )}

        {config.apiKey == '0CvrNUpqu9YQxKBYs5e8kVcexYrngGMI' ? (
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-DLJFN9ZK34"></script>
        ) : (
          ''
        )}
        {config.apiKey == '0CvrNUpqu9YQxKBYs5e8kVcexYrngGMI' ? (
          <script>
            {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-DLJFN9ZK34');
  `}
          </script>
        ) : (
          ''
        )}

        {config.apiKey == 'owsxU3oO8m5HQ7aakuWG2-AJFy947XZR' ? (
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-NRL490PQZ3"></script>
        ) : (
          ''
        )}
        {config.apiKey == 'owsxU3oO8m5HQ7aakuWG2-AJFy947XZR' ? (
          <script>
            {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NRL490PQZ3');
  `}
          </script>
        ) : (
          ''
        )}

        {config.apiKey == 'rKvhzABrpmpy58xUFfwh-yCdZnaHZYnu' ? (
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-HKEW1HZKC6"></script>
        ) : (
          ''
        )}
        {config.apiKey == 'rKvhzABrpmpy58xUFfwh-yCdZnaHZYnu' ? (
          <script>
            {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
 
  gtag('config', 'G-HKEW1HZKC6');
          `}
          </script>
        ) : (
          ''
        )}
      </Helmet>
    );
  };
}

export default MetaTags;
