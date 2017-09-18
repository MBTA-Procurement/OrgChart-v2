var mongoose = require('mongoose');

var budgetSchema = mongoose.Schema({
    unit: String,
    descr: String,
    dept: Number,
    year: Number,
    budgetAmount: String,
    actualsAmount: String

}, {collection: "budget"});

module.exports = budgetSchema;