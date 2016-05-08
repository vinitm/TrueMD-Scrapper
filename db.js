var mongoose = require('mongoose');

function trim(val) {
    return val.trim();
}

module.exports = {
    schema: mongoose.Schema({
        brandName: {
            type: String,
            set: trim
        }
    }),
    connect: function () {
        if (mongoose.connection.readyState)
            return;
        mongoose.connect('mongodb://localhost/medicine');
        var db = mongoose.connection;
        db.on('error', function (err) {
            console.log(err);
        });
        db.once('open', function () {
            console.log('successfull');
        });
    },
    write: function (data) {
        var Medicine = mongoose.model('medicine', this.schema);
        data.forEach(function (item) {
            Medicine.create(item, function (err) {
                if (err) {
                    if (err.code !== 11000) {
                        throw err;
                    }
                }
            });
        });

    }
};