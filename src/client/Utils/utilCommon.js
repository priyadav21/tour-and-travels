import React, { useEffect, useState } from 'react';

export const formatMenuLink = menuLink => {
  let url = menuLink ? '/' + menuLink : '/';
  url = menuLink ? (menuLink.indexOf('http') ? url : menuLink) : url;
  return url;
};
