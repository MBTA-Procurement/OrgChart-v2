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
app.listen(port);

app.get("/api/vendor-list", getFiles);
app.post("/api/upload/image", upload.single('myFile'), uploadFile);
app.post("/api/upload/p", upload.single('myFile'), uploadFileProcurement);
app.post("/api/upload/odepartments", upload.single('myFile'), uploadFileODepartments);
app.post("/api/upload/adepartments", upload.single('myFile'), uploadFileADepartments);
app.post("/api/upload/oemployees", upload.single('myFile'), uploadFileOEmployees);
app.post("/api/upload/aemployees", upload.single('myFile'), uploadFileAEmployees);
app.post("/api/upload/kpi", upload.single('myFile'), uploadFileKPI);
app.post("/api/upload/vendorData", upload.single('myFile'), uploadFileVendor);

function uploadFileOEmployees(req, res) {
    var myFile = req.file;
    fs.rename(__dirname + '/public/uploads/' + myFile.filename, __dirname + '/public/resources/operatingEmployees.json');
    var callbackUrl = "/#!/employees";
    res.redirect(callbackUrl);
}

function getFiles(req, res) {
    console.log('getting file list');
    var files = fs.readdirSync(__dirname + '/public/vendor-data');
    console.log(files);
    res.send(files);
}

function uploadFileAEmployees(req, res) {
    var myFile = req.file;
    fs.rename(__dirname + '/public/uploads/' + myFile.filename, __dirname + '/public/resources/OrgChartExcel.json');
    var callbackUrl = "/#!/employees";
    res.redirect(callbackUrl);
}

function uploadFileVendor(req, res) {
    console.log(req.body);
    var vendorName = req.body.vendorName;
    var deptNo = true;
    var year = false;
    var price = false;
    var quantity = false;
    var extra = 0;
    var field1 = undefined;
    var operation = undefined;
    var field2 = undefined;
    var vars = [];
    if (req.body.year != undefined) {
        year = true;
    }
    if (req.body.price != undefined) {
        price = true;
    }
    if (req.body.quantity != undefined) {
        quantity = true;
    }
    if (req.body.extra != 0) {
        extra = req.body.extra;
    }
    if (req.body.field1 != undefined) {
        field1 = req.body.field1;
    }
    if (req.body.operation != undefined) {
        operation = req.body.operation;
    }
    if (req.body.field2 != undefined) {
        field2 = req.body.field2;
    }
    if (req.body.var1 != undefined) {
        vars.push(req.body.var1);
    }
    if (req.body.var2 != undefined) {
        vars.push(req.body.var2);
    }
    if (req.body.var3 != undefined) {
        vars.push(req.body.var3);
    }
    if (req.body.var4 != undefined) {
        vars.push(req.body.var4);
    }
    if (req.body.var5 != undefined) {
        vars.push(req.body.var5);
    }
    if (req.body.var6 != undefined) {
        vars.push(req.body.var6);
    }
    if (req.body.var7 != undefined) {
        vars.push(req.body.var7);
    }
    if (req.body.var8 != undefined) {
        vars.push(req.body.var8);
    }
    if (req.body.var9 != undefined) {
        vars.push(req.body.var9);
    }
    if (req.body.var10 != undefined) {
        vars.push(req.body.var10);
    }
    var config = {
        "deptNo": deptNo,
        "year": year,
        "price": price,
        "quantity": quantity,
        "extra": extra,
        "field1": field1,
        "operation": operation,
        "field2": field2,
        "vars": vars
    };
    console.log(config);
    var myFile = req.file;
    fs.rename(__dirname + '/public/uploads/' + myFile.filename, __dirname + '/public/vendor-data/' + vendorName + '.csv');
    fs.writeFile(__dirname + '/public/vendor-data/configuration/' + vendorName + "_config.json", JSON.stringify(config));
    var callbackUrl = "/#!/vendor/" + vendorName;
    res.redirect(callbackUrl);
}

function uploadFileADepartments(req, res) {
    var myFile = req.file;
    fs.rename(__dirname + '/public/uploads/' + myFile.filename, __dirname + '/public/resources/flare_experiment_2.json');
    var callbackUrl = "/#!";
    res.redirect(callbackUrl);
}

function uploadFileODepartments(req, res) {
    var myFile = req.file;
    fs.rename(__dirname + '/public/uploads/' + myFile.filename, __dirname + '/public/resources/flare_experiment.json');
    var callbackUrl = "/#!";
    res.redirect(callbackUrl);
}

function uploadFileProcurement(req, res) {
    var myFile = req.file;
    csvJSON2(myFile.filename);
    var callbackUrl = "/#!/procurement";
    res.redirect(callbackUrl);
}

function uploadFile(req, res) {
    var myFile = req.file;
    csvJSON(myFile.filename);
    var callbackUrl = "/#!";
    res.redirect(callbackUrl);
}

function uploadFileKPI(req, res) {
    var myFile = req.file;
    fs.rename(__dirname + '/public/uploads/' + myFile.filename, __dirname + '/public/resources/kpitodept.json');
    var callbackUrl = "/#!/kpi";
    res.redirect(callbackUrl);
}

//var csv is the CSV file with headers
function csvJSON(csvName) {
    fs.rename(__dirname + '/public/uploads/' + csvName, __dirname + '/public/csv/budgetdata.csv');

}

function csvJSON2(csvName) {
    fs.rename(__dirname + '/public/uploads/' + csvName, __dirname + '/public/csv/procurementdata.csv');

}