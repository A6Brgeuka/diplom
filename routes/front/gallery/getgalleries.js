var Gallery = require('models/gallery').Gallery;

exports.get = function(req, res, next) {

    Gallery.getgalleries(function(err, galleries) {
        if (err) {
            return res.json([false, err.message]);
            //return next(new HttpError(403, err.message));
        } else {
            res.json([true, galleries])
        }
    });

};