import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const MenuLink = ({ menuLink }) => (
  <Link to={menuLink.url.path}>{menuLink.label}</Link>
);

export default MenuLink;
