var Advert = require('models/advert').Advert;
var HttpError = require('error').HttpError;
var AuthError = require('models/user').AuthError;


exports.get = function(req, res) {
    res.render('front/advert/create');
};

exports.post = function(req, res, next) {

    var myReq = req;

    Advert.create(myReq, function(err) {
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }

        res.redirect('/');

    });

};