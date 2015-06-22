var Category = require('models/category').Category;

exports.post = function(req, res, next) {

    //var myReq = req;
    console.log(req.body);

    Category.create(req, function(err) {
        if (err) {
            return res.json([false, err.message]);
            //return next(new HttpError(403, err.message));
        } else {
            res.json([true, 'Category created'])
        }

        //res.redirect('/');

    });

};