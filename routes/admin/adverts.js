var Advert = require('models/advert').Advert;
var HttpError = require('error').HttpError;



exports.get = function(req, res) {
    User.getUsers(function(err, users) {

        if (err) return next(err);

        res.render('admin/users',
            {users: users}
        );
    });
};
