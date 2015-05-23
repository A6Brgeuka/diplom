var Advert = require('models/advert').Advert;
var ObjectID = require('mongodb').ObjectID;

exports.get = function(req, res, next){

    try{
        var id = new ObjectID(req.params.id);
    }
    catch (e){
        return next(e);
    }

    Advert.advertDelete(id, function(err, advert){
        if(err) return next(err);
        res.redirect('/');
    });
};
