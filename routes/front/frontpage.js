//var Advert = require('models/advert').Advert;

exports.get = function(req, res){

    /*Advert.getAdverts(function(err, adverts){
        if(err) return next(err);
        //console.log(adverts);
        res.render("front/index", {
            adverts: adverts
        });
    });*/
    res.render("front/index");
};