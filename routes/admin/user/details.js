var User = require('models/user').User;
var ObjectID = require('mongodb').ObjectID;

exports.get = function(req, res, next){

    try{
        var id = new ObjectID(req.query.id);
    }
    catch (e){
        return next(e);
    }

    User.getUserById(id, function(err, user){
        if(err) return next(err);

        res.json(user);
        /*res.render("front/advert/details", {
         advert: advert
         });*/
    });
};
