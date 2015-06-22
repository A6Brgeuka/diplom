var User = require('models/user').User;

exports.get = function(req, res, next) {

    User.getUserById(req.session.user,function(err, user) {
        if (err) {
            return res.json([false, err.message]);
            //return next(new HttpError(403, err.message));
        } else {
            res.json([true, user])
        }
    });

};