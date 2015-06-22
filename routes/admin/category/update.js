var Category = require('models/category').Category;

exports.post = function(req, res, next) {

    Category.edit(req, function(err) {
        if (err) {
            return res.json([false, err.message]);
            //return next(new HttpError(403, err.message));
        } else {
            res.json([true, 'Category updated'])
        }

        //res.redirect('/');

    });

};