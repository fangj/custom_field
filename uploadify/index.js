var express = require('express');
var multer = require('multer'); // v1.0.5
var path=require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(__dirname,'../uploads'))
  },
  filename: function (req, file, cb) {
  	var extname=path.extname(file.originalname);
  	var basename=path.basename(file.originalname,extname);
    cb(null, basename + '-' + Date.now()+extname);
  }
})
 
var upload = multer({ storage: storage })
// var upload = multer({ dest: 'uploads/' }); // for parsing multipart/form-data

var uploadify=function (app){
	app.use(express.static(__dirname + '/uploads'));
	app.post('/upload', upload.array('files'), function (req, res, next) {
	  console.log(req.files);
	  console.log(req.body);
	  res.json(req.body);
	});
}

module.exports=uploadify;
