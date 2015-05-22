var User = require('models/user').User;

exports.get = function(req, res, next){

    User.getCurrentUsers(req, function(err, user){
       if(err) next(err);
        console.log(user);
        res.render('front/profile', {
            curUser: user
        });
    });
};