const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let fileUpload = new Schema({
   file: {
      type: String
   },
   date: {
    type: String
   },
   
}, {
   collection: 'fileUploads'
});

module.exports = mongoose.model('fileUpload', fileUpload);