import React from 'react';
import logo from '../images/github-search-logo.svg';

const Logo = () => (
  <div className="logo-container">
    <img className="logo-img" src={logo} alt="Github Search" />
    <h1 className="logo-text">Github Search</h1>
  </div>
);

export default Logo;
