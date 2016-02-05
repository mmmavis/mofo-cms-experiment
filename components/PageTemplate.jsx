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
    let oAuthEndpoint = `https://public-api.wordpress.com/oauth2/authorize?client_id=44828&redirect_uri=http://localhost:9090/auth_success&response_type=token&blog=105660860`;
    
    request
      .get(oAuthEndpoint)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        console.log(res.text);
        var params = window.location.hash.substr(1);
        var token = params.substr( params.indexOf( 'access_token' ) ).split( '&' )[0].split( '=' )[1];
        console.log("token = ", token);
        this.getPagefromWP(token);
      });
  }
  getPagefromWP(token) {
    request
      .get(this.props.apiEndpoint)
      .set(`Authorization`, `Bearer ${decodeURIComponent(token)}`)
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
