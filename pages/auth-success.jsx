import React from 'react';
import request from 'superagent';
import configWPCom from '../config-wp-com';

export default class AuthSuccess extends React.Component {
  componentDidMount() {
    let params = window.location.hash.substr(1);
    let token = params.substr( params.indexOf( 'access_token' ) ).split( '&' )[0].split( '=' )[1];
    this.storeWpAuthInfo({ 
      token: token,
      blogId: configWPCom.blogId
    });
    window.location = window.localStorage.getItem("redirect_url");
  }
  storeWpAuthInfo(info) {
    let storage = window.localStorage;
    storage.setItem(configWPCom.localStorageKey, JSON.stringify(info));
  }
  render() {
    return (
      <div>
        Redirecting...
      </div>
    );
  }
}

