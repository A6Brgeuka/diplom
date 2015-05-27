var User = require('models/user').User;

exports.post = function(req, res, next) {

    User.edit(req, function(err) {
        if (err) {
            return res.json([false, err.message]);
            //return next(new HttpError(403, err.message));
        } else {
            res.json([true, 'User updated'])
        }

        //res.redirect('/');

    });

};