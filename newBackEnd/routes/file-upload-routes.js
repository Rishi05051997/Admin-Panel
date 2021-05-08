const express = require('express');
const app = express();
const fileUpload = express.Router();
// var express = require('express');
// var _router = express.Router();
var multer = require('multer');
var path = require('path');

// fileUpload model
let fileUploadSchema = require('../models/file-upload-schema');


var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
    }
});

var upload = multer({storage: store})

// get all files
fileUpload.get('/allFiles', function(req, res, next) {
//    const fileUpload =  fileUploadSchema.find(  );
//    res.status(200).json({ fileUpload });

   fileUploadSchema.find({}, (err, fileUpload)=>{
    if(err){
        res.status(500).json({errMsg:err});
    } else {
        res.status(200).json({Msg:fileUpload})
    }
})
});

// Add Employee
fileUpload.post('/files', (req, res, next) => {
    fileUploadSchema.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
    })
  });

// // post data on submit button
// fileUpload.post('/files', upload.single('file'), (req, res, next) => {
   
//     if(!req.file) {
//         return res.status(500).send({ message: 'Upload fail'});
//     } else {
//         // co
//         req.body.file = 'http://192.168.0.7:4000/files/' + req.file.filename;
//         fileUploadSchema.create(req.body,  (err, gallery) => {
      
//             if (err) {
//                 console.log(err);
//                 return next(err);
//             }
//             res.json(gallery);
//         });
//     }
// });

// get data by id
fileUpload.get('/:id', function(req, res, next) {
    
    fileUploadSchema.findById(req.params.id, function (err, gallery) {
        if (err) return next(err);
        res.json(gallery);
    });
});


// Delete employee
fileUpload.delete('/delete/:id',(req, res, next) => {
    fileUploadSchema.findOneAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })


// Update files
fileUpload.put(('/update/:id'),(req, res, next) => {
  fileUploadSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error)
      return next(error);
     
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})



// // post data on image input
// fileUpload.post('/imageInputFile', upload.single('file'), function(req, res, next) {
//   if(!req.file) {
//       return res.status(500).send({ message: 'Upload fail'});
//   } else {
//       req.body.file = 'http://192.168.0.7:4000/uploads/' + req.file.filename;
//       fileUploadSchema.create(req.body, function (err, gallery) {
//           console.log(req.body);
//           if (err) {
//               console.log(err);
//               res.status(500).json({err:'wrong'});
//               return next(err);
//           }
//          console.log('uploaded success')
//           res.status(200).json({gallery});
//       });
//   }
// }); 

module.exports = fileUpload;