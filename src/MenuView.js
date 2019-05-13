import React from 'react';
import MenuLink from './MenuLink';

const MenuView = ({menuLinks}) => (
  <ul>
    {menuLinks.map(menuLink => <li><MenuLink menuLink={menuLink} /></li>)}
  </ul>
);

export default MenuView;