var Category = require('models/category').Category;

exports.post = function(req, res) {

    Category.removeCategory(req.body.id, function(err) {
        if (err) {
            return res.json([false, err.message]);
            //return next(new HttpError(403, err.message));
        } else {
            res.json([true])
        }
    });

};