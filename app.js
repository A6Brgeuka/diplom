var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config'); //������������ ����������
var log = require('libs/log')(module);
var HttpError = require('error').HttpError;

var multer  = require('multer');

var app = express(); //������� ����������

var done=false;

app.use(multer({
  dest: './public/admin/images/',
  limits: {
    fieldNameSize: 100,
    files: 2,
    fields: 5
  },
  rename: function (fieldname, filename) {
    return filename+Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file, req, res) {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
    done=true;
    //return res.send(200);
  },
  onError: function(){
    console.log("FATAL ERROR");
  }
}));

app.engine('ejs', require('ejs-locals')); //����� � ���������� ejs ����� ������������ ejs-locals
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.favicon());


if (app.get('env') == 'development') {
  app.use(express.logger('dev')); //http ��� ��������
} else {
  app.use(express.logger('default'));
}

app.use(express.bodyParser()); //��������� ����� �� post, json, get

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
//require('routes/admin');



app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(config.get('port'), function(){   //express ����� ������������ ��� �������� �������
  log.info('Express server listening on port ' + config.get('port'));
});


//middleware - ���������� ��������

app.post('/adm/gallery/upload',function(req,res){
  if(done==true){
    console.log(req.files);
    res.end("File uploaded.");
  }
});


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

