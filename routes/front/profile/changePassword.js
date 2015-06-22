var User = require('models/user').User;

exports.post = function(req, res, next) {

    console.log(req.body);
    User.changePassword(req,function(err) {
        if (err) {
            return res.json([false, err.message]);
            //return next(new HttpError(403, err.message));
        } else {
            res.json([true])
        }
    });

};