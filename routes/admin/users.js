var User = require('models/user').User;
var HttpError = require('error').HttpError;
var AuthError = require('models/user').AuthError;


exports.get = function(req, res) {
    User.getUsers(function(err, users) {

        if (err) return next(err);

        res.render('admin/users',
            {users: users}
        );
    });
};
