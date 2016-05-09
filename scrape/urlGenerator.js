var url = require('url');

var KEY = "yash6992";
var LIMIT = 50000;

function generateNumbers() {
    var nums = [];
    for (var i = 0; i <= 9; i++)
        nums.push(i + '');
    return nums;
}

function generateAlphabets() {
    var alphs = [];
    for (var i = 1; i <= 26; i++)
        alphs.push(String.fromCharCode('a'.charCodeAt(0) + i - 1));
    return alphs;
}

function getUrlObject(id) {
    return {
        protocol: 'http:',
        slashes: true,
        hostname: 'truemd.in',
        pathname: '/api/typeahead.json',
        query: {
            key: KEY,
            limit: LIMIT,
            id: id
        }
    };
}

function generateURLS(ids) {
    var urls = [];
    ids.forEach(function (item) {
        var obj = getUrlObject(item);
        var link = url.format(obj);
        urls.push(link);
    });
    return urls;
}


var urls = generateURLS(generateNumbers().concat(generateAlphabets()));

module.exports = urls;