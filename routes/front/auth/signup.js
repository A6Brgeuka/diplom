var User = require('models/user').User;
var HttpError = require('error').HttpError;
var AuthError = require('models/user').AuthError;


/*exports.get = function(req, res) {
    res.render('front/auth/registration');
};*/

exports.post = function(req, res, next) {
    var login = req.body.login;
    var password = req.body.password;

    console.log(req.body);

    User.registration(login, password, function(err, user) {
        if (err) {
            if (err instanceof AuthError) {
                return res.json([false, "User exists"]);
                //return next(new HttpError(403, err.message));
            } else {
                return res.json([false, "HttpError"]);
                //return next(err);
            }
        } else {
            console.log(user);
            req.session.user = user._id;
            res.json([true, user]);
        }
        //res.json([false, "User exists"]);
        //res.send({});

    });

};