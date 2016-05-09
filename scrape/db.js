var mongoose = require('mongoose');
var mPromise = require('./promise');

mongoose.connect('mongodb://localhost/medicine123');
var db = mongoose.connection;


db.on('error', function (err) {
    console.log(err);
});
db.on('disconnected', function () {
    console.log('disconnected');
});
db.on('open', function () {
    console.log('successfull');
});

function trim(val) {
    return val.trim();
}

var schema = mongoose.Schema({
    brandName: {
        type: String,
        set: trim
    }
});

var Medicine = mongoose.model('medicine', schema);

module.exports = {
    disconnect: function () {
        mongoose.disconnect();
    },

    write: function (items) {
        var promises = [];
        items.map(function (item) {
            var obj = {
                brandName: item
            };
            var promise = Medicine.create(obj).catch(function (err) {
                if (err) {
                    if (err.code !== 11000) {
                        throw err;
                    }
                }
            });
            promises.push(promise);
        });
        return mPromise.settle(promises);
    },

    getConnection: function () {
        return mongoose.connection;
    },
    isConnected: function () {
        return !!db.readyState;
    }
};