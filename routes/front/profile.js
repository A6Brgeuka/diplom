var User = require('models/user').User;

exports.get = function(req, res, next){

    User.getCurrentUser(req, function(err, curUser){
       if(err) next(err);
        console.log(curUser);
        res.render('front/profile', {
            curUser: curUser
        });
    });
};