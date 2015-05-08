var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config'); //конфигураци€ приложени€
var log = require('libs/log')(module);
var HttpError = require('error').HttpError;


var app = express(); //создаем приложение

app.engine('ejs', require('ejs-locals')); //файлы с расширение ejs будем обрабатывать ejs-locals
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.favicon());


if (app.get('env') == 'development') {
  app.use(express.logger('dev')); //http лог запросов
} else {
  app.use(express.logger('default'));
}

app.use(express.bodyParser()); //считывает формы из post, json, get

app.use(express.cookieParser()); // req.cookies

var MongoStore = require('connect-mongo')(express);
var mongoose = require('libs/mongoose');

app.use(express.session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('sesion:cookie'),
  store: new MongoStore({mongoose_connection: mongoose.connection})
}));

/*app.use(function(req, res, next){
  req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
  res.send("Visits: " + req.session.numberOfVisits);
});*/

app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadUser'));

app.use(app.router);

require('routes')(app);



app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(config.get('port'), function(){   //express будет обрабатывать все вход€щие запросы
  log.info('Express server listening on port ' + config.get('port'));
});


//middleware - обработ    чик запросов

app.use(function(err, req, res, next){
  if (typeof err == 'number') { // next(404);
    err = new HttpError(err);
  }

  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
    if (app.get('env') == 'development') {
      express.errorHandler()(err, req, res, next);
    } else {
      log.error(err);
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }
});


//browser -> login password -> server
//server -> sid ->

