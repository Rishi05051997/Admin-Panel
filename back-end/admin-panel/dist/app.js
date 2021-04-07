'use strict';

var express = require('express');
var app = express();
var PORT = 3000;

app.get('/', function (req, res) {
    res.json({
        msg: 'Welcome to Associate builder backend...!!!'
    });
});

app.listen(PORT, function () {
    console.log('server running at ' + PORT);
});
//# sourceMappingURL=app.js.map