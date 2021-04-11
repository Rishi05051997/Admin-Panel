'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('../src/config/routes');

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import  mongoose from " mongoose";
var mongoose = require('mongoose'); // const express = require('express');


var app = (0, _express2.default)();
var PORT = 3000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/associate-builder');

app.use(_express2.default.json());
app.use(_express2.default.urlencoded());
app.use((0, _morgan2.default)('dev'));
// middleware 
app.use('/api', _routes.router);

app.use(function (req, res, next) {
    var error = new Error('Not found');
    error.message = "Invalid Route";
    error.status = 404;
    next(error);
});

app.use(function (error, req, res, next) {
    res.status(error.status || 5000);
    return res.json({
        error: {
            message: error.message
        }
    });
});

app.get('/', function (req, res) {
    res.json({
        msg: 'Welcome to Associate builder backend...!!!'
    });
});

// app.get('/associates', (res, req) => {
//     res.json(associates);
// })

app.listen(PORT, function () {
    console.log('server running at ' + PORT);
});
//# sourceMappingURL=app.js.map