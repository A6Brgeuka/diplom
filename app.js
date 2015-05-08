var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config'); //конфигурация приложения
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

app.use(require('middleware/sendHttpError'));

app.use(app.router);

require('routes')(app);



app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(config.get('port'), function(){   //express будет обрабатывать все входящие запросы
  log.info('Express server listening on port ' + config.get('port'));
});


//middleware - обработчик запросов

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



/*var routes = require('./routes');
var user = require('./routes/user');

// all environments



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



app.get('/', routes.index);
app.get('/users', user.list);*/


