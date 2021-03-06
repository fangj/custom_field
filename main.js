var express = require('express');
var app = express();
var nedb=require('nedb');
var expressRestResource = require('express-rest-resource');

app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(express.static('dist'));

var postDb = new nedb({ filename: 'postDb', autoload: true });
app.use('/api/post', expressRestResource({ db: postDb }));

require('./uploadify')(app,'uploads');

// app.use(express.static(__dirname + '/uploads'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});