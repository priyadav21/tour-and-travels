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
					<div>	<a href={webSocial.facebook}>
						<i className="fab fa-facebook-f" aria-hidden="true"></i>
					</a></div> : ''
			}
			{
				webSocial.linkedin ? <div ><a href={webSocial.linkedin}>
					<i className="fab fa-linkedin" aria-hidden="true"></i>
				</a></div> : ''
			}
			{
				webSocial.twitter ? <div ><a href={webSocial.twitter}>
					<i className="fab fa-twitter" aria-hidden="true"></i>
				</a></div> : ''
			}
			{
				webSocial.instagram ? <div > <a href={webSocial.instagram}>
					<i className="fab fa-instagram" aria-hidden="true"></i>
				</a></div> : ''
			}
			{
				webSocial.youtube ? <div ><a href={webSocial.youtube}>
					<i className="fab fa-youtube" aria-hidden="true"></i>
				</a></div> : ''
			}
			{
				webSocial.pinterest ? <div ><a href={webSocial.pinterest}>
					<i className="fab fa-pinterest" aria-hidden="true"></i>
				</a></div> : ''
			}
		</>
	);
};
export default SocialFooterLinkWithText;