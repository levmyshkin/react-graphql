import React from 'react';

const MenuLink = ({ menuLink }) => (
  <a href={menuLink.url.path}>{menuLink.label}</a>
);

export default MenuLink;