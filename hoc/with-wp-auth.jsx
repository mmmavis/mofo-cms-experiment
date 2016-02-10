import React from 'react';
import request from 'superagent';
import configWPCom from '../config-wp-com';

export var WithWpAuth = ComposedComponent => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wpToken: null
    };
  }
  componentDidMount() {
    this.getWPToken(this.getPagefromWP);
  }
  getWPToken() {
    let storage = window.localStorage;
    let wpAuthInfo = storage[configWPCom.localStorageKey];
    if ( wpAuthInfo ) {
      if ( JSON.parse(wpAuthInfo).token !== this.state.wpToken ) {
        this.setState({ wpToken: JSON.parse(wpAuthInfo).token });
      }
    } else {
      window.location = configWPCom.wpAuthEndpoint;
    }
  }
  render() {
    return (
      <ComposedComponent {...this.props} {...this.state} />
    );
  }
}

// export var WithWpAuth = function(Component) { 
//   return React.createClass({ 
//     componentDidMount: function() {
//       this.getWPToken();
//     },
//     getWPToken: function() {
//       let storage = window.localStorage;
//       let wpAuthInfo = storage[configWPCom.localStorageKey];
//       let token = wpAuthInfo ? JSON.parse(wpAuthInfo).token : null;
//       this.getPagefromWP(token);
//     },
//     render: function() {
//       return <Component {...this.props} {...this.state} />; 
//     }
//   }); 
// }
