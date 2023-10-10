import React, { useEffect, useState } from 'react';

import { GetHeaderComponent} from '../Utils/themeUtil';


function HeaderUp(props) {
  const [websiteMenuLeft, setWebsiteMenuLeft] = useState(props.websiteMenuLeft);
  const [websiteMenuRight, setWebsiteMenuRight] = useState(props.websiteMenuRight);
  const [websiteSetting, setWebsiteSetting] = useState(props.websiteSetting);

useEffect(() => {
  setWebsiteMenuLeft(props.websiteMenuLeft);
}, [props.websiteMenuLeft]);


  return GetHeaderComponent(websiteMenuLeft,websiteMenuRight,websiteSetting);
}
export default HeaderUp;