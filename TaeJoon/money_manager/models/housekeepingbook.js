var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var housekeepingbookSchema = new Schema({
    date: { type: Date, default: Date.now },
    category: String,
    contents: String,
    price: Number,
    etc: String,
    receipt: String
});

module.exports = mongoose.model('housekeepingbook', housekeepingbookSchema);