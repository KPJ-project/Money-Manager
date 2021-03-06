var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MoneyManagerSchema = new Schema({
    date: { type: Date, default: Date.now },
    category: String,
    contents: String,
    price: Number,
    etc: String,
    cc: Boolean,
    receipt_img: { type: String, required: false },
    cost: Boolean,
});

module.exports = mongoose.model('moneymanager', MoneyManagerSchema);