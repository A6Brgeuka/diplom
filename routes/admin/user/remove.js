var User = require('models/user').User;

exports.post = function(req, res) {

    User.removeUser(req.body.id, function(err) {
        if (err) {
            return res.json([false, err.message]);
            //return next(new HttpError(403, err.message));
        } else {
            res.json([true])
        }
    });

};