var Advert = require('models/advert').Advert;
var User = require('models/user').User;

exports.get = function(req, res, next){

    Advert.find({}, function(err, adverts){
        if(err) return next(err);

        /*var users = [];



        adverts.forEach(function(advert){
            User.findById(advert.userId, function(err, user){
                console.log("TYT ADVERT");
                console.log(advert);

                if(err) return next(err);

                console.log("TYT USER");
                console.log(user);

                users.push(user.username);
            });
        });*/



        res.render("index", {
            adverts: adverts
        });
    });
};