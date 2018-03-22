require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 4500;

// Static File Service
app.use(express.static('public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Node.jsÀÇ native Promise »ç¿ë
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/todo_test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {
    console.log("mongo db connection OK.");
});


app.use('/moneys', require('./routes/moneys'));

app.listen(port, () => console.log('server listening on port ${port}'));