'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _associate = require('../models/associate.model');

var _associate2 = _interopRequireDefault(_associate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Joi = require('Joi');
var associates = [{
    _id: "1",
    item: "Amazon",
    qty: 10,
    date: new Date()

}, {
    _id: "1",
    item: "Amazon",
    qty: 10,
    date: new Date()

}, {
    _id: "1",
    item: "Amazon",
    qty: 10,
    date: new Date()

}];

exports.default = {
    finadAll: function finadAll(req, res, next) {
        // res.json(associates);
        _associate2.default.find().then(function (associates) {
            return res.json(associates);
        });
    },
    create: function create(req, res) {
        // const {item, qty, date, due, tax, rate} = req.body;
        var schema = Joi.object().keys({
            item: Joi.string().required(),
            date: Joi.date().required(),
            qty: Joi.number().integer().required(),
            due: Joi.date().required(),
            tax: Joi.number().integer().optional(),
            rate: Joi.number().optional()

        });

        var _Joi$validate = Joi.validate(req.body, schema),
            error = _Joi$validate.error,
            value = _Joi$validate.value;

        if (error && error.details) {
            return res.status(400).json(error);
        }
        _associate2.default.create(value).then(function (associate) {
            res.json(associate);
        }).catch(function (err) {
            return res.status(500).json(err);
        });
    }
};
//# sourceMappingURL=associate.controller.js.map