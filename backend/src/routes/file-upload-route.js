const express = require('express');
const fileUpload = express.Router();



// Use MongoDB
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
// The database variable
var database;
// The users collection
var FILE_UPLOAD_COLLECTION = "FILE-UPLOADS";


mongodb.MongoClient.connect('mongodb://localhost:27017/employees',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, function (error, file) {

        // Check if there are any problems with the connection to MongoDB database.
        if (error) {
            console.log(error);
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        database = file.db();
        // console.log("Database connection done.");

        
    });

// get all files
fileUpload.get('/allFiles', function(req, res, next) {
  database.collection(FILE_UPLOAD_COLLECTION).find({}).toArray(function (error, data) {
    if (error) {
        manageError(res, err.message, "Failed to get files.");
    } else {
        res.status(200).json({Msg:data});
    }
});

});

// Add Employee
fileUpload.post('/files', (req, res, next) => {
  var file = req.body;
  database.collection(FILE_UPLOAD_COLLECTION).insertOne(file, function (err, doc) {
      if (err) {
          manageError(res, err.message, "Failed to post file.");
      } else {
          res.status(201).json(doc.ops[0]);
      }
    });
    
  });



// get data by id
fileUpload.get('/:id', function(req, res, next) {
  database.collection(FILE_UPLOAD_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
    if (err) {
        manageError(res, err.message, "Failed to delete user.");
    } else {
        res.status(200).json(result);
    }
})
    
});


// Delete files
fileUpload.delete('/delete/:id',(req, res, next) => {
  database.collection(FILE_UPLOAD_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
    if (err) {
        manageError(res, err.message, "Failed to delete product.");
    } else {
        res.status(200).json(req.params.id);
    }
});
    
    
  })


// Update files
fileUpload.put(('/update/:id'),(req, res, next) => {
  database.collection(FILE_UPLOAD_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) },{
    $set : req.body,
    $currentDate: { lastModified: true }
}, function (err, result) {
    if (err) {
        manageError(res, err.message, "Failed to update File.");
    } else {
        res.status(200).json(result.modifiedCount);
    }
});
 
})

// Errors handler.
function manageError(res, reason, message, code) {
  console.log("Error: " + reason);
  res.status(code || 500).json({ "error": message });
}

 

module.exports = fileUpload;