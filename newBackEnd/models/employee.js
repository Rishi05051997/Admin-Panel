const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Employee = new Schema({
   
   empId: {
      type: Number
   },
   name: {
    type: String
    },
   email: {
      type: String
   },
   password: {
      type: Number
   },
   location: {
       type: String
   },
   role: {
       type: String
   },
   status : {
       type: Boolean
   }
}, {
   collection: 'employees'
})

module.exports = mongoose.model('Employee', Employee)