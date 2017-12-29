var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var api = require('./routes/api');
//因為前端可能是另一台Server，所以要載入cors(Cross-Origin Resource Sharing)套件
var cors = require('cors')
var app = express();
//cors參數設定
const corsOptions = {
  origin: [
    'http://localhost:8080',
    'http://localhost:4200'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
};
//使用cors
app.use(cors(corsOptions))

//view 使用的模板引擎，api可忽略
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//下面兩行是接收json格式傳入的參數
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//設定可靜態存取的目錄，api可忽略
app.use(express.static(path.join(__dirname, 'public')));
//路由，根目錄
app.use('/', index);
//api路由
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
