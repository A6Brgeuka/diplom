var User = require('models/user').User;
var HttpError = require('error').HttpError;
var AuthError = require('models/user').AuthError;


/*
exports.get = function(req, res) {
    res.render('front/auth/login');
};
*/

exports.post = function(req, res, next) {
    var login = req.body.login;
    var password = req.body.password;

    User.authorize(login, password, function(err, user) {
        if (err) {
            if (err instanceof AuthError) {
                return res.json([false, "Auth Error"]);
                //return next(new HttpError(403, err.message));
            } else {
                return res.json([false, "Fatal Error"]);
                //return next(err);
            }
        }

        req.session.user = user._id;
        res.json([true, user]);
        //res.redirect('/');

    });

};