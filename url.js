var url = require('url');

var KEY = "yash6992";
var LIMIT = 20;

var urlObj = {
    protocol: 'http:',
    slashes: true,
    hostname: 'truemd.in',
    pathname: '/api/typeahead.json',
    query: {
        key: KEY,
        limit: LIMIT
    }
};

module.exports = function (obj) {
    //extract data from argument object to local variables
    var id = obj.id;

    //set url Object properties
    urlObj.query.id = id;

    //create url string from object
    return url.format(urlObj);
};