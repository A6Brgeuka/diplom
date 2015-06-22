var Post = require('models/post').Post;

exports.post = function(req, res) {

    Post.removePost(req.body.id, function(err) {
        if (err) {
            return res.json([false, err.message]);
            //return next(new HttpError(403, err.message));
        } else {
            res.json([true])
        }
    });

};