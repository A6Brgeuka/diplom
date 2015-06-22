var checkAccess = require('middleware/checkAccess');
var chechAuth = require('middleware/checkAuth');
var path = require('path');

module.exports = function(app){
  app.get('/', require('./front/frontpage').get);

  app.post('/signin', require('./front/auth/signin').post);
  app.post('/signout', require('./front/auth/signout').post);
  app.post('/signup', require('./front/auth/signup').post);


  app.get('/showpost', require('./front/post/show').get);
  app.get('/details',  require('./front/post/details').get);

  app.get('/front/gallery/getgalleries', require('./front/gallery/getgalleries').get);

  app.get('/front/profile', require('./front/profile/profile').get);
  app.post('/front/profile/update', require('./front/profile/update').post);
  app.post('/front/profile/changePassword', require('./front/profile/changePassword').post);


  //admin route

  app.get('/adm', chechAuth, checkAccess, require('./admin/adminpage').get);

  //posts
  app.get('/adm/post/getposts', require('./admin/post/getPosts').get);
  app.get('/adm/post/details', chechAuth, checkAccess, require('./admin/post/details').get);
  app.post('/adm/post/update', chechAuth, checkAccess, require('./admin/post/update').post);
  app.post('/adm/post/create', chechAuth, checkAccess, require('./admin/post/create').post);
  app.post('/adm/post/remove', chechAuth, checkAccess, require('./admin/post/remove').post);

  //categories
  app.get('/adm/category/getcategories', require('./admin/category/getCategories').get);
  app.get('/adm/category/details', chechAuth, checkAccess, require('./admin/category/details').get);
  app.post('/adm/category/update', chechAuth, checkAccess, require('./admin/category/update').post);
  app.post('/adm/category/create', chechAuth, checkAccess, require('./admin/category/create').post);
  app.post('/adm/category/remove', chechAuth, checkAccess, require('./admin/category/remove').post);

  //users
  app.get('/adm/user/getusers', require('./admin/user/getusers').get);
  app.get('/adm/user/details', chechAuth, checkAccess, require('./admin/user/details').get);
  app.post('/adm/user/update', chechAuth, checkAccess, require('./admin/user/update').post);
  app.post('/adm/user/create', chechAuth, checkAccess, require('./admin/user/create').post);
  app.post('/adm/user/remove', chechAuth, checkAccess, require('./admin/user/remove').post);

  //gallery
  app.get('/adm/gallery/getgalleries', chechAuth, checkAccess, require('./admin/gallery/getgalleries').get);
  app.post('/adm/gallery/upload', chechAuth, checkAccess, require('./admin/gallery/upload').post);







};


