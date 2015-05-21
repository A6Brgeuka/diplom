var checkAccess = require('middleware/checkAccess');
var chechAuth = require('middleware/checkAuth');

module.exports = function(app){
  app.get('/', require('./front/frontpage').get);

  app.get('/login', require('./front/login').get);
  app.post('/login', require('./front/login').post);

  app.post('/logout', require('./front/logout').post);

  app.get('/registration', require('./front/registration').get);
  app.post('/registration', require('./front/registration').post);

  app.get('/create', chechAuth,require('./front/create').get);
  app.post('/create', chechAuth, require('./front/create').post);

  app.get('/details/:id', chechAuth,require('./front/details').get);

  app.get('/edit/:id', chechAuth,require('./front/edit').get);
  app.post('/edit', chechAuth,require('./front/edit').post);

  app.get('/admin', chechAuth, checkAccess, require('./admin/').get);

  app.get('/admin/users', chechAuth, checkAccess, require('./admin/users').get);
};

/*var User = require('models/user').User;
var Role = require('models/role').Role;
var HttpError = require('error').HttpError;
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app){
  app.get('/', function(req, res, next) {
    res.render("index", {});
  });



  app.get('/users', function(req, res, next) {
    User.find({}, function(err, users){
      if(err) return next(err);
      res.json(users);
    });
  });

  app.get('/user/:id', function(req, res, next) {
    try{
      var id = new ObjectID(req.params.id);
    } catch (e) {
      return next(404);
    }

    User.findById(id, function(err, user){
      if(err) return next(err);
      if(!user){
        next(new HttpError(404, "User not found"));
      }
      res.json(user);
    });
  });



  app.get('/roles', function(req, res, next){
    Role.find({}, function(err, roles){
      if(err) return next(err);
      res.json(roles);
    });
  });
};*/
