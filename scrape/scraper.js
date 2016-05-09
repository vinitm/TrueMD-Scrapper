var rp = require('request-promise');
var Limiter = require('./limiter');


var Scraper = function () {};
Scraper.prototype = {
    scrape: function (urls, db) {

        var limiter = new Limiter(1, urls, function (url) {
            return rp(url).then(function (htmlStr) {
                var jsonObj = JSON.parse(htmlStr);
                console.log(url + '   started');
                return db.write(jsonObj).then(function () {
                    console.log(url + '   done');
                }).catch(function (err) {
                    console.log('scraper.js   ' + err);
                });
            });
        });

        if (db.isConnected()) {
            limiter.start();
        } else {
            db.getConnection().once('open', function () {
                limiter.start();
            });
        }

        limiter.done().then(function () {
            db.disconnect();
        });
    }
};


module.exports = Scraper;