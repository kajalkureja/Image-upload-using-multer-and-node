const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const multer = require("multer");

const path = require('path');
const fs = require('fs');

const mongodb = require('mongodb');
const { dirname } = require("path");

const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
  
});

var upload = multer({ storage: storage });

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url,{
     useNewUrlParser : true
},(err, client) => {
    if(err) return console.log(err);

    db = client.db('Multipart');

    app.listen(3000, () => {
      console.log("Mongodb server listening at 3000")
    });
})

var uploadMultiple = upload.fields([{ name: 'file1', maxCount: 10 }, { name: 'file2', maxCount: 10 }]);

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req, res) => {
  res.render('index');
});

app.post('/uploadfile', uploadMultiple, function (req, res, next) {

    if(req.files){
        console.log(req.files)

        console.log("files uploaded")
    }
    res.send(req.files);
})

app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});