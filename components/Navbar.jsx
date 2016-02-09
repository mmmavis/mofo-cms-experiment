import React from 'react';
import NavbarLink from './NavbarLink.jsx';
import configWPCom from '../config-wp-com';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wpAuthConnected: false
    };
  }
  componentDidMount() {
    this.checkWpAuthStatus();
  }
  componentWillUpdate() {
    this.checkWpAuthStatus();
  }
  checkWpAuthStatus() {
    let storage = window.localStorage;
    let wpAuthInfo = storage[configWPCom.localStorageKey];
    let token = wpAuthInfo ? JSON.parse(wpAuthInfo).token : null;
    if ( this.state.wpAuthConnected != !!token ) {
      this.setState( {wpAuthConnected: !!token} );
    }
    console.log("\n !!token = ", !!token);
  }
  render() {
    return (
      <div id="navbar">
        <div className="container">
          <NavbarLink path="/" pageName="Home" />
          <NavbarLink path="/about" pageName="About" />
          <NavbarLink path="/curricula" pageName="Curricula" />
          <NavbarLink path="/blog" pageName="Blog" />
          { this.state.wpAuthConnected ? null : <a href={configWPCom.wpAuthEndpoint}>Connect with WP</a> }
        </div>
      </div>
    );
  }
}
