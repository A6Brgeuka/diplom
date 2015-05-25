var HttpError = require('error').HttpError;
var User = require('models/user').User;
var ObjectID = require('mongodb').ObjectID;

module.exports = function(req, res, next) {


    User.findById(req.session.user, function(err, user){

        if(err) return next(err);

        if(user.isAdmin == false){
            return res.json([false, 'Auth Error']);
            //res.json([false, 'Access denied']);
            //return next(new HttpError(500, "FATAL ERROR"));
        }
        next();
        //res.json([false, 'Access']);

    });
};