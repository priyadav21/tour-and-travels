import React, { useEffect, useState } from 'react';

function SocialFooterLink(props) {
	const [webSocial, setWebSocial] = useState(props.webSocial);

	useEffect(() => {
		setWebsiteMenuFooter(props.websiteMenuFooter);
	}, [props.websiteMenuFooter]);
	return (
		<>
			{
				webSocial.facebook ? <a href={webSocial.facebook} className="facebook">
					<i className="fab fa-facebook-f" aria-hidden="true"></i>
				</a> : ''
			}
			{
				webSocial.linkedin ? <a href={webSocial.linkedin} className="linkedin">
					<i className="fab fa-linkedin" aria-hidden="true"></i>
				</a> : ''
			}
			{
				webSocial.twitter ? <a href={webSocial.twitter} className="twitter">
					<i className="fab fa-twitter" aria-hidden="true"></i>
				</a> : ''
			}
			{
				webSocial.instagram ? <a href={webSocial.instagram} className="instagram">
					<i className="fab fa-instagram" aria-hidden="true"></i>
				</a> : ''
			}
			{
				webSocial.youtube ? <a href={webSocial.youtube} className="youtube">
					<i className="fab fa-youtube" aria-hidden="true"></i>
				</a> : ''
			}
			{
				webSocial.pinterest ? <a href={webSocial.pinterest} className="pinterest">
					<i className="fab fa-pinterest" aria-hidden="true"></i>
				</a> : ''
			}
			</>
	);
};
export default SocialFooterLink;