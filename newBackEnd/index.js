let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   dbConfig = require('./databse/db');
   
// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

// Setting up port with express js
const employeeRoute = require('./routes/employee.route');
const fileUploadRouter = require('./routes/file-upload-routes');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
   extended: true,
   
}));
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
   res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
   next(); // Important
})
app.use(cors()); 

app.use('/uploads', express.static(path.join('file')));
// app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
// app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
// app.use(express.static('/uploads'));
app.use('/api', employeeRoute);
app.use('/api/file-upload', fileUploadRouter);

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