var rp = require('request-promise');
var URL = require('url');
var fs = require('fs');
var DB = require('./db');
var Limiter = function (limit) {
    var count = 0;
    var urls = [];
    return {
        add: function (url) {
            urls.push(url);
            this._startPromise();
        },
        print: function () {
            console.log(urls);
        },
        decrementCount: function () {
            count--;
            this._startPromise();
        },
        incrementCount: function () {
            count++;
        },
        _startPromise: function () {
            var self = this;
            if (!this._validate())
                return;

            var url = urls.shift();
            console.log(url + " started");
            this.incrementCount();
            rp(url)
                .then(function (htmlString) {
                    console.log(url + " done");
                    var jsonObj = JSON.parse(htmlString);
                    jsonObj = jsonObj.map(function (item) {
                        return {
                            brandName: item
                        };
                    });
                    DB.connect();
                    DB.write(jsonObj);
                })
                .catch(function (err) {
                    console.log('error: ' + err);
                    /* urls.push(url);*/
                    fs.appendFileSync('error.txt', URL.parse(url, true).query.id + '\n');
                })
                .finally(function () {
                    self.decrementCount();
                });
        },
        _validate: function () {
            if (count === limit || !urls.length)
                return false;
            return true;
        }
    };
};

module.exports = Limiter;