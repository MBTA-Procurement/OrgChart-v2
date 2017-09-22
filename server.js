var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer'); // npm install multer --save
var underscore = require('underscore');
var upload = multer({dest: __dirname + '/public/uploads'});
var arrayToTree = require('array-to-tree');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require("./app.js");
var port = process.env.PORT || 3000;
console.log('listening');
app.listen(port);
app.get('/api/budget', getBudget);

app.post("/api/upload/image", upload.single('myFile'), uploadFile);
app.post("/api/upload/p", upload.single('myFile'), uploadFileProcurement);
var budgetModel = require('./models/budget.model.server');



function getBudget(req, res) {

    console.log('server-side service fetching budget data');
    budgetModel
        .getBudget()
        .then(function (budgets) {
            res.json(budgets);
        });

}


function uploadFileProcurement(req, res) {
    console.log('uploading procurement');
    var myFile = req.file;
    console.log(myFile);
    csvJSON2(myFile.filename);
    //}
    var callbackUrl = "/#!/procurement";
    console.log(callbackUrl);
    res.redirect(callbackUrl);
}

function uploadFile(req, res) {
    console.log('uploading');
    var myFile = req.file;
    console.log(myFile);
    csvJSON(myFile.filename);
    //}
    var callbackUrl = "/#!";
    console.log(callbackUrl);
    res.redirect(callbackUrl);
}



//var csv is the CSV file with headers
function csvJSON(csvName) {
    console.log('csv converting!');
    console.log(csvName);
    var currentdate = new Date();
    var datetime = "" + currentdate.getDate() + "."
        + (currentdate.getMonth()+1)  + "."
        + currentdate.getFullYear() + "_"
        + currentdate.getHours() + "."
        + currentdate.getMinutes() + "."
        + currentdate.getSeconds();
    fs.rename(__dirname+ '/public/uploads/' + csvName, __dirname + '/public/csv/budgetdata.csv');

}

function csvJSON2(csvName) {
    console.log('csv converting!');
    console.log(csvName);
    var currentdate = new Date();
    var datetime = "" + currentdate.getDate() + "."
        + (currentdate.getMonth()+1)  + "."
        + currentdate.getFullYear() + "_"
        + currentdate.getHours() + "."
        + currentdate.getMinutes() + "."
        + currentdate.getSeconds();
    fs.rename(__dirname+ '/public/uploads/' + csvName, __dirname + '/public/csv/procurementdata.csv');

}