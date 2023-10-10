import React, { useState, useEffect, useCallback } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TumblrIcon,
  TumblrShareButton,
  TelegramShareButton,
  TelegramIcon
} from 'react-share';
import config from '../../../config';

function ShareButtonLink(props) {
    const height_224 = {
        height: '224px'
    };
   
  const [linkUrl, setLinkUrl] = useState(props.linkUrl);
  const [title, setTitle] = useState(props.title);
  const [imageUrl, setImageUrl] = useState(props.imageUrl);

  useEffect(() => {
  }, [props.data]);

    return (
      <div className="post-bar">
        <div className="bar-content">
          <ul>
            <li>
              <WhatsappShareButton url={linkUrl} title={title} className="share">
                <WhatsappIcon size={25} round={true} />
              </WhatsappShareButton>
            </li>
            {imageUrl ? (
              <li>
                <PinterestShareButton
                  media={imageUrl}
                  url={linkUrl}
                  description={title}
                  className="share"
                >
                  <PinterestIcon size={25} round={true} />
                </PinterestShareButton>
              </li>
            ) : (
              ''
            )}
            <li>
              <FacebookShareButton url={linkUrl} quote={title} className="share">
                <FacebookIcon size={25} round={true} />
              </FacebookShareButton>
            </li>
            <li>
              <LinkedinShareButton url={linkUrl} title={title} description="" className="share">
                <LinkedinIcon size={25} round={true} />
              </LinkedinShareButton>
            </li>
            <li>
              <TwitterShareButton url={linkUrl} title={title} className="share">
                <TwitterIcon size={25} round={true} />
              </TwitterShareButton>
            </li>
            <li>
              <TumblrShareButton url={linkUrl} title={title} className="share">
                <TumblrIcon size={25} round={true} />
              </TumblrShareButton>
            </li>
            <li>
              <TelegramShareButton url={linkUrl} title={title} className="share">
                <TelegramIcon size={25} round={true} />
              </TelegramShareButton>
            </li>
          </ul>
          <div className="progressx">
            <div className="completed"></div>
          </div>
        </div>
      </div>
    );
}
export default ShareButtonLink