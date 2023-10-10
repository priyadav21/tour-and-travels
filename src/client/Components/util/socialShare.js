import React, { useEffect, useState } from 'react';

function SocialShare(props) {
	const [webSocial, setWebSocial] = useState(props.webSocial);

	useEffect(() => {
		setWebsiteMenuFooter(props.websiteMenuFooter);
	}, [props.websiteMenuFooter]);
	return (

		 <div className="float-right">
			 {
			 webSocial.facebook ? <a href="{webSocial.facebook}">
                        <i className="fab fa-facebook-f  profile-social-media"></i>
                      </a>:''
			}
			{
				webSocial.instagram ? <a href={webSocial.instagram}>
					<i className="fab fa-instagram  profile-social-media"></i>
				</a> : ''
			}
			{
				webSocial.twitter ? <a href={webSocial.twitter}>
				 <i className="fab fa-twitter  profile-social-media"></i>
				</a> : ''
			}
			</div>
	);
};
export default SocialShare;