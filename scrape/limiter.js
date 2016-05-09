var mPromise = require('./promise');
var Limiter = function (limit, data, functionToCall) {
    var count = 0;
    var promises = [];

    function next() {
        functionToCall(data[count]).then(function (result) {
            promises[count].resolve(result);
            count++;
            if (count < data.length) {
                next();
            }
        }).catch(function (err) {
            promises[count].reject(err);
        });
    }

    this.done = function () {
        return mPromise.settle(promises.map(function (item) {
            return item.promise;
        }));
    };

    this.start = function () {
        var length = data.length;
        var temp;
        for (var i = 0; i < length; i++) {
            temp = new Promise(function (resolve, reject) {
                promises.push({
                    resolve: resolve,
                    reject: reject
                });
            });
            promises[i].promise = temp;

        }
        for (i = 0; i < limit && i < data.length; i++) {
            functionToCall(data[i]).then(function (i) {
                return function () {
                    promises[i].resolve();
                    count++;
                    if (i === limit - 1) {
                        next();
                    }
                };
            }(i)).catch(function (err) {
                promises[count].reject();
            });
        }
    };
};


module.exports = Limiter;