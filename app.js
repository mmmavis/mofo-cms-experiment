import express from 'express';
import path from 'path';
import Habitat from 'habitat';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import request from 'superagent';
import routes from './Routes.jsx';

var env = new Habitat();
Habitat.load();

var PORT = env.get('PORT') || '9090';
var WP_CREDS = env.get('WP');

var app = express();
app.set('view engine', 'html');

function serveStaticFiles(req, res) {
  var pathRequested = req.path;
  if ( pathRequested === "/public/style.css" ) {
    res.sendFile( path.resolve("public/style.css") );
  } else if ( pathRequested === "/bundle.js" ) {
    res.sendFile( path.resolve("bundle.js") );
  } else if ( pathRequested === "/login") {
    authWP(res);
  } 
  // else if ( pathRequested === "/auth_success") {
  //   getToken(req,res);
  // }
  else {
    res.status(404).send('Not found');
  }
}

function authWP(res) {
  request.get(WP_CREDS.auth_endpoint)
          .query({
            client_id: WP_CREDS.client_id,
            redirect_uri: WP_CREDS.auth_redirect_uri,
            blog_id: WP_CREDS.blog_id,
            response_type: 'code'
          })
          .end(function(err, resFromWP) {
            if (err) { 
              console.log(`error: `, err); 
              res.status(404).send(err.response.text); 
            } else {
              res.send(resFromWP.text);
            }
          });
}

function getToken(req,res) {
  request.post(WP_CREDS.token_endpoint)
         .set('Content-Type', 'application/x-www-form-urlencoded')
         .send({
            client_id: WP_CREDS.client_id,
            redirect_uri: WP_CREDS.auth_redirect_uri,
            client_secret: WP_CREDS.client_secret,
            code: req.query.code,
            grant_type: 'authorization_code'
         })
         .end(function(err, resFromWP) {
          if (err) { 
            console.log(`error: `, err); 
            res.status(404).send(err.response.text); 
          } else {
            console.log("\n\n resFromWP ///// \n\n", resFromWP.text);
            res.send("Token get!");
          }
        });
}

function htmlTemplate(appHtmlAsString) {
  var pathToStyleCss = path.join(__dirname, "public", "style.css");
  var pathToBundleJs = path.join(__dirname, "bundle.js");

  return (`
    <!DOCTYPE html>
    <html>
      <head lang="en">
        <meta charSet="UTF-8" />
        <title>Mofo CMS Experiment</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css' />
        <link href=${pathToStyleCss} type="text/css" rel="stylesheet" />
      </head>
      <body>
        <div id="app">
          ${appHtmlAsString}
        </div>
        <script src=${pathToBundleJs}></script>
      </body>
    </html>
  `);
}

app.get('/*', function (req, res) {
  console.log("==== server hit, req.path = ", req.path);
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log("error :(");
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      console.log("redirectLocation = ", redirectLocation);
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.status(200).send( htmlTemplate(ReactDOMServer.renderToStaticMarkup(<RoutingContext {...renderProps} />)) );
    } else {
      serveStaticFiles(req, res);
    }
  })
});

app.listen(PORT, function() {
  console.log("\n///// Server listening at "+ PORT + " /////\n");
});
