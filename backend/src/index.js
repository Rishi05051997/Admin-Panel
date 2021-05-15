let express = require('express'),
    bodyParser = require('body-parser');
   
   cors = require('cors'),
   
//    dbConfig = require('./databse/db');
// Use MongoDB
mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
// The database variable
var database;
// The users collection
var USERS_COLLECTION = "Users";

   
// Connecting with mongo db

mongodb.MongoClient.connect('mongodb://localhost:27017/employees',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, function (error, user) {

        // Check if there are any problems with the connection to MongoDB database.
        if (error) {
            console.log(error);
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        database = user.db();
        console.log("Database connection done.");

        
    });



// Setting up port with express js
// employeeRoute = require('../src/routes/users-route');
// fileUpload = require('../src/routes/file-upload-route');
var filesRoute = require('../src/routes/file-upload-route');
const app = express();

app.use(express.json());-
app.use(express.urlencoded({
   extended: true,
   
}));
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
//    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
   next(); // Important
})
app.use(cors()); 

// app.use('/uploads', express.static(path.join('file')));
// app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
// app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
// app.use(express.static('/uploads'));
// app.use('/api', employeeRoute);
// app.use('/api/file-upload', filesRoute);

//////////
//Get all users
app.get('/api/read' , (req , res)=>{
    database.collection(USERS_COLLECTION).find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get users.");
        } else {
            res.status(200).json(data);
        }
    });
})
//// Get Users by Id
app.get('/api/read/:id' , (req , res)=>{
    database.collection(USERS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
        if (err) {
            manageError(res, err.message, "Failed to delete user.");
        } else {
            res.status(200).json(result);
        }
    })

})

//// Post Request of Users
app.post('/api/create' , (req , res)=>{
    var user = req.body;
    
    database.collection(USERS_COLLECTION).insertOne(user, function (err, doc) {
        if (err) {
            manageError(res, err.message, "Failed to create new user.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
})


/// For Edit Request of Users
app.put('/api/update/:id' , (req , res)=>{
    database.collection(USERS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) },{
        $set : req.body
    }, function (err, result) {
        if (err) {
            manageError(res, err.message, "Failed to update user.");
        } else {
            res.status(200).json(result.modifiedCount);
        }
    });
})

/// for Delete Request of Users
app.delete('/api/delete/:id' , (req , res)=>{

    database.collection(USERS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
        if (err) {
            manageError(res, err.message, "Failed to delete product.");
        } else {
            res.status(200).json(req.params.id);
        }
    });

});

// //// Getting all uploaded files
// app.get('/api/file-upload/allFiles' , (req , res)=>{
   
//     database.collection(FILE_UPLOAD_COLLECTION).find({}).toArray(function (error, data) {
//         if (error) {
//             console.log(error);
//             manageError(res, err.message, "Failed to get files.");
//         } else {
//             res.status(200).json({Msg:data});
//         }
//     });
// });


app.use('/api/file-upload', filesRoute);



// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
   
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});


