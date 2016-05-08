var url = require('./url');
var Limiter = require('./limiter')(1);

//0-9
for (var i = 50; i <= 57; i++)
    Limiter.add(url({
        id: String.fromCharCode(i)
    }));

//a-z
for (var i = 97; i <= 122; i++)
    Limiter.add(url({
        id: String.fromCharCode(i)
    }));

