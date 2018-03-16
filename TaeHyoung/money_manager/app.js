//3rd party 라이브러리들
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/*
bodyparser는 바디를 파싱하여서, req.body 객체로 접근할 수 있도록 도와준다.

 Form Submit이 있을 때, Content-Type이 x-www-form-urlencoded로 요청이 들어오는데
 bodyparser.urlencoded가 req.body 객체를 생성해준다.

 app.use는 미들웨어를 사용할 때, 사용하는데, bodyparser라는 미들웨어의 urlencoded , json 메쏘드를 사용한다는 뜻이다.
*/

//미들웨어
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//포트 설정
var port = process.env.PORT || 8080; //기본은 8080으로 쓰고, 환경변수 설정으로 포트를 입력 시 그 포트로 대체한다는 뜻이다.

//데이터베이스 모델 설정
var MoneyManager = require('./models/money');

//라우터 설정
var router = require('./routes')(app, MoneyManager)

//몽구스 설정
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