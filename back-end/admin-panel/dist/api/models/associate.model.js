'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AssociateSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    due: {
        type: Date,
        required: true
    },
    rate: {
        type: Number
        // required: true
    },
    tax: {
        type: Number
        // required: true
    }
});

exports.default = mongoose.model('Associate', AssociateSchema);
//# sourceMappingURL=associate.model.js.map