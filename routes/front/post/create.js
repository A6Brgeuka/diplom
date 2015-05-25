var Post = require('models/post').Post;
var HttpError = require('error').HttpError;
var AuthError = require('models/user').AuthError;

/*
exports.get = function(req, res) {
    res.render('front/advert/create');
};
*/

exports.post = function(req, res, next) {

    //var myReq = req;

    Post.create(req, function(err) {
        if (err) {
            return res.json([false, err.message]);
                //return next(new HttpError(403, err.message));
        } else {
            res.json([true, 'Post created'])
        }

        //res.redirect('/');

    });

};