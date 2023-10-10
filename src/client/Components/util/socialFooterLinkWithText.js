import React, { useEffect, useState } from 'react';

function SocialFooterLinkWithText(props) {
	const [webSocial, setWebSocial] = useState(props.webSocial);

	useEffect(() => {
		setWebsiteMenuFooter(props.websiteMenuFooter);
	}, [props.websiteMenuFooter]);
	return (
		<>
			{
				webSocial.facebook ?
					<div className="fl-fl">	<a href={webSocial.facebook}>
						<i className="fab fa-facebook-f" aria-hidden="true"></i> Liks Us!
					</a></div> : ''
			}
			{
				webSocial.linkedin ? <div className="fl-fl"><a href={webSocial.linkedin}>
					<i className="fab fa-linkedin" aria-hidden="true"></i> Follow us!
				</a></div> : ''
			}
			{
				webSocial.twitter ? <div className="fl-fl"><a href={webSocial.twitter}>
					<i className="fab fa-twitter" aria-hidden="true"></i> Tweet Us!
				</a></div> : ''
			}
			{
				webSocial.instagram ? <div className="fl-fl"> <a href={webSocial.instagram}>
					<i className="fab fa-instagram" aria-hidden="true"></i> Follow us!
				</a></div> : ''
			}
			{
				webSocial.youtube ? <div className="fl-fl"><a href={webSocial.youtube}>
					<i className="fab fa-youtube" aria-hidden="true"></i> Wathc us!
				</a></div> : ''
			}
			{
				webSocial.pinterest ? <div className="fl-fl"><a href={webSocial.pinterest}>
					<i className="fab fa-pinterest" aria-hidden="true"></i> Pin us!
				</a></div> : ''
			}
		</>
	);
};
export default SocialFooterLinkWithText;