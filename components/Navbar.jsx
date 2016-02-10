import React from 'react';
import NavbarLink from './NavbarLink.jsx';
import configWPCom from '../config-wp-com';

export default class Navbar extends React.Component {
  render() {
    return (
      <div id="navbar">
        <div className="container">
          <NavbarLink path="/" pageName="Home" />
          <NavbarLink path="/about" pageName="About" />
          <NavbarLink path="/curricula" pageName="Curricula" />
          <NavbarLink path="/blog" pageName="Blog" />
        </div>
      </div>
    );
  }
}
