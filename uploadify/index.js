var express = require('express');
var multer = require('multer'); // v1.0.5
var path=require('path');
var fs = require('fs-extra');


var uploadify=function (app,upload_path){

	upload_path=upload_path||"uploads";
	var abs_upload_path=path.join(__dirname,'..',upload_path);
	fs.ensureDirSync(abs_upload_path);

	var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null,abs_upload_path)
	  },
	  filename: function (req, file, cb) {
	  	var extname=path.extname(file.originalname);
	  	var basename=path.basename(file.originalname,extname);
	    cb(null, basename + '-' + Date.now()+extname);
	  }
	})
 
	var upload = multer({ storage: storage })
	// var upload = multer({ dest: 'uploads/' }); // for parsing multipart/form-data

	app.use(express.static(abs_upload_path));
	app.post('/upload', upload.array('files'), function (req, res, next) {
	  console.log(req.files);
	  console.log(req.body);
	  res.json(req.body);
	});
}

module.exports=uploadify;
