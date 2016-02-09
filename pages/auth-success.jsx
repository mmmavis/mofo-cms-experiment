import React from 'react';
import request from 'superagent';
import configWPCom from '../config-wp-com';

export default class AuthSuccess extends React.Component {
  componentDidMount() {
    var params = window.location.hash.substr(1);
    var token = params.substr( params.indexOf( 'access_token' ) ).split( '&' )[0].split( '=' )[1];
    this.storeWpAuthInfo({ 
      token: token,
      blogId: configWPCom.blogId
    });
  }
  storeWpAuthInfo(info) {
    let storage = window.localStorage;
    storage[configWPCom.localStorageKey] = JSON.stringify(info);
  }
  render() {
    return (
      <div>
        blah blah
      </div>
    );
  }
}

