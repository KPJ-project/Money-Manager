var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var MoneyManager = require('./models/money');
var router = require('./routes')(app, MoneyManager)


var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/money_manager', function(err){
    if (err){
        console.error('mongodb connection error', err);
    }
    console.log('mongodb connected');
});


app.listen(port, function(){
    console.log('Connected'+ port + 'port!');
});