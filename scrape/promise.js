function reflect(promise) {
    return promise.then(function (x) {
            return {
                state: "fulfilled",
                value: x
            };
        },
        function (e) {
            return {
                state: "rejected",
                value: e
            };
        }
    );
}

Promise.settle = function (promises) {
    return Promise.all(promises.map(reflect));
};

module.exports = Promise;