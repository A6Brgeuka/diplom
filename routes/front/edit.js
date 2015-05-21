var Advert = require('models/advert').Advert;
var HttpError = require('error').HttpError;
var ObjectID = require('mongodb').ObjectID;


exports.get = function(req, res) {

    try{
        var id = new ObjectID(req.params.id);
    } catch (e) {
        new HttpError(e);
    }

    Advert.getAdvertById(id, function(err, advert){
        if(err) new HttpError(err.message);
        res.render("front/edit", {
            advert: advert
        });
    });
};

exports.post = function(req, res, next) {

    Advert.advertUpdate(req, function(err){
        if(err) return next(err);
        res.redirect('/');
    });

};