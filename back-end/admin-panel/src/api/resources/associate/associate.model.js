const mongoose = require('mongoose');
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const AssociateSchema = new Schema({
    empId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        // required: true
    },
    status: {
        type: Boolean,
        // required: true
    },
});

AssociateSchema.plugin(mongoosePaginate);
export default mongoose.model('Associate', AssociateSchema);

