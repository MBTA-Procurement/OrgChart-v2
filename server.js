var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/public/uploads'});
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
app.post("/api/upload/vendorOptions", upload.single('myFile'), uploadVendorOptions);
app.delete("/api/remove", removeVendor);

function removeVendor(req, res) {
    var vendorName = req.body;
    console.log('removing vendor');
}

function uploadFileOEmployees(req, res) {
    var myFile = req.file;
    fs.rename(__dirname + '/public/uploads/' + myFile.filename, __dirname + '/public/resources/operatingEmployees.json');
    var callbackUrl = "/#!/employees";
    res.redirect(callbackUrl);
}

function getFiles(req, res) {
    var files = fs.readdirSync(__dirname + '/public/vendor-data');
    res.send(files);
}

function uploadFileAEmployees(req, res) {
    var myFile = req.file;
    fs.rename(__dirname + '/public/uploads/' + myFile.filename, __dirname + '/public/resources/OrgChartExcel.json');
    var callbackUrl = "/#!/employees";
    res.redirect(callbackUrl);
}

function uploadVendorOptions(req, res) {
    var tooltipConfig = JSON.parse(fs.readFileSync(__dirname + '/public/vendor-data/tooltip/' + req.body.vendorName + "_tooltip-config.json", 'utf8'));
    var futureFile = {};
    for (x in tooltipConfig) {
        var elt = {};
        var displayName = "display" + x;
        var viewName = "view" + x;
        var moneyName = "money" + x;
        elt[x] = {};
        if (req.body[displayName] !== undefined) {
            if (req.body[displayName] === 'on') {
                elt[x].display = true;
            }
        }
        else {
            elt[x].display = false;
        }
        if (req.body[viewName] !== undefined) {
            elt[x].view = req.body[viewName];
        }
        if (req.body[moneyName] !== undefined) {
            if (req.body[moneyName] === 'on') {
                elt[x].money = true;
            }
        }
        else {
            elt[x].money = false;

        }
        futureFile[x] = elt[x];

    }
    futureFile['operation'] = {
        "field1": req.body.field1,
        "operation": req.body.operation,
        "field2": req.body.field2,
        "format": req.body.operationFormat,
        "name": req.body.opName
    };

    //console.log(futureFile);
    fs.writeFile(__dirname + '/public/vendor-data/tooltip/' + req.body.vendorName + "_tooltip-config.json", JSON.stringify(futureFile));
    var callbackUrl = "/#!/vendor/" + req.body.vendorName;
    setTimeout(function () {
        res.redirect(callbackUrl);
    }, 1500);
}

function uploadFileVendor(req, res) {
    var vendorName = req.body.vendorName;
    var deptNo = true;
    var year = false;
    var price = false;
    var quantity = false;
    var extra = 0;
    var field1 = "0";
    var operation = "0";
    var field2 = "0";
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
    var f = {"name": "", "value": ""};
    if (req.body.var1 != undefined) {
        f = {"name": req.body.varDesc1, "value": req.body.var1};
        console.log(f);
        vars.push(f);
    }
    if (req.body.var2 != undefined) {
        f = {"name": req.body.varDesc2, "value": req.body.var2};
        vars.push(f);
    }
    if (req.body.var3 != undefined) {
        f = {"name": req.body.varDesc3, "value": req.body.var3};
        vars.push(f);
    }
    if (req.body.var4 != undefined) {
        f = {"name": req.body.varDesc4, "value": req.body.var4};
        vars.push(f);
    }
    if (req.body.var5 != undefined) {
        f = {"name": req.body.varDesc5, "value": req.body.var5};
        vars.push(f);
    }
    if (req.body.var6 != undefined) {
        f = {"name": req.body.varDesc6, "value": req.body.var6};
        vars.push(f);
    }
    if (req.body.var7 != undefined) {
        f = {"name": req.body.varDesc7, "value": req.body.var7};
        vars.push(f);
    }
    if (req.body.var8 != undefined) {
        f = {"name": req.body.varDesc8, "value": req.body.var8};
        vars.push(f);
    }
    if (req.body.var9 != undefined) {
        f = {"name": req.body.varDesc9, "value": req.body.var9};
        vars.push(f);
    }
    if (req.body.var10 != undefined) {
        f = {"name": req.body.varDesc10, "value": req.body.var10};
        vars.push(f);
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

    var myFile = req.file;
    var options = {};
    for (var p = 0; p < config.vars.length; p++) {
        options[config.vars[p].value] = {"display": true, "money": false, "view": "values"};
    }
    options['operation'] = {"field1": "0", "operation": "0", "field2": "0", "name": "Insert Name Here"};
    fs.rename(__dirname + '/public/uploads/' + myFile.filename, __dirname + '/public/vendor-data/' + vendorName + '.csv');
    fs.writeFile(__dirname + '/public/vendor-data/configuration/' + vendorName + "_config.json", JSON.stringify(config));
    fs.writeFile(__dirname + '/public/vendor-data/tooltip/' + vendorName + "_tooltip-config.json", JSON.stringify(options));

    var callbackUrl = "/#!/vendor/" + vendorName + "/options";
    setTimeout(function () {
        res.redirect(callbackUrl);

    }, 1000);
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