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

var budgetModel = require('./models/budget.model.server');

app.get('/api/budget', getBudget);


function getBudget(req, res) {

    console.log('server-side service fetching budget data');
    budgetModel
        .getBudget()
        .then(function (budgets) {
            res.json(budgets);
        });

}

app.post("/api/upload/image", upload.single('myFile'), uploadFile);

function uploadFile(req, res) {
    console.log('uploading');
    var myFile = req.file;
    console.log(myFile);
    /* if (myFile.originalname.substr(myFile.originalname.length - 3) == "csv") {
         console.log('tis a csv'); */
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
/*
var contents = fs.readFileSync("public/resources/reportsTo.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);

var tree = arrayToTree(jsonContent, {
    parentProperty: 'parent'
});
var treeString = JSON.stringify(tree);

fs.writeFile("C:/Users/noldakowski/Desktop/tree.json", treeString, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
*/