var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MoneyManagerSchema = new Schema({
    date: {type: Date, default: Date.now},
    category: String,
    contents: String,
    price: Number,
    etc: String,
    cc: Boolean
});

module.exports = mongoose.model('moneymanager', MoneyManagerSchema);

// var moneymanager = new MoneyManager({
//     date: 2018-03-15,
//     category: "식대",
//     contents: "맥도날드 빅맥",
//     price: 5100,
//     etc: "과기대 앞 맥도날드에서 점심으로 빅맥 먹음",
//     cc: 1
// });

// moneymanager.save(function(err, moneymanager){
//     if(err) return console.log(err);
//     console.dir(moneymanager);
// });