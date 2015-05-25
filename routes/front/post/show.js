var Post = require('models/post').Post;

exports.get = function(req, res, next) {

    Post.getPosts(function(err, posts) {
        if (err) {
            return res.json([false, err.message]);
            //return next(new HttpError(403, err.message));
        } else {
            res.json([true, posts])
        }
    });

};