import React from 'react';
import request from 'superagent';
import configWPCom from '../config-wp-com';

export default class PageTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wpLoaded: false
    };
  }
  getWPToken() {
    let storage = window.localStorage;
    let wpAuthInfo = storage[configWPCom.localStorageKey];
    let token = wpAuthInfo ? JSON.parse(wpAuthInfo).token : null;
    this.getPagefromWP(token);
  }
  getPagefromWP(token) {
    request
      .get(this.props.apiEndpoint)
      .set(`Authorization`, `Bearer ${decodeURIComponent(token)}`)
      // .set(`Authorization`, `Bearer ${token}`)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        this.wpPage = JSON.parse(res.text);
        console.log(this.wpPage);
        this.setState({wpLoaded: true});
      });
  }
  componentDidMount() {
    this.getWPToken();
  }
  render() {
    var page = this.wpPage;

    return (
      <div>
        <div className="note">{this.props.note}</div>
        { this.state.wpLoaded ?
          <div>
            <img src={page.featured_image} />
            <h1 dangerouslySetInnerHTML={{__html: page.title}} />
            <div dangerouslySetInnerHTML={{__html: page.content}} />
          </div>
          : <p>Loading WP posts</p>
        }
      </div>
    );
  }
}
