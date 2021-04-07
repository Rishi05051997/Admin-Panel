const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AssociateSchema = new Schema({
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
        type: Number,
        // required: true
    },
    tax: {
        type: Number,
        // required: true
    },
})