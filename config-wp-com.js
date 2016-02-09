var URL_TO_WORDPRESS_BLOG = 'https://mavismoztest.wordpress.com';

var WORDPRESS_COM_API_ENDPOINT = "https://public-api.wordpress.com/rest/v1.1/sites/";
var WORDPRESS_BLOG_ID = "105660860";
var WP_AUTH_ENDPOINT = 'https://public-api.wordpress.com/oauth2/authorize/';
var WP_CLIENT_ID = 44828;
var WP_AUTH_REDIRECT_URI = 'http://localhost:9090/auth-success';

module.exports = {
  localStorageKey: 'wp-auth-info',
  urlToWordPress: URL_TO_WORDPRESS_BLOG,
  wpApiEndpoint: WORDPRESS_COM_API_ENDPOINT + WORDPRESS_BLOG_ID + "/",
  wpAuthEndpoint: WP_AUTH_ENDPOINT+"?client_id="+WP_CLIENT_ID+"&redirect_uri="+WP_AUTH_REDIRECT_URI+"&response_type=token&blog="+WORDPRESS_BLOG_ID,
  blogId: WORDPRESS_BLOG_ID,
  pageID: {
    home: 3,
    about: 1,
    curricula: 9,
    blog: 15
  }
};
