var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var housekeepingbookSchema = new Schema({
    date: { type: Date },
    category: String,
    contents: String,
    price: Number,
    etc: String,
    receipt: String,
    income: Boolean,
    year: Number,
    month: Number
});

module.exports = mongoose.model('housekeepingbook', housekeepingbookSchema);