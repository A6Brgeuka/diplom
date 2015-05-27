var Post = require('models/post').Post;
var ObjectID = require('mongodb').ObjectID;

exports.get = function(req, res, next){

    try{
        var id = new ObjectID(req.query.id);
    }
    catch (e){
        return next(e);
    }

    Post.getPostById(id, function(err, advert){
        if(err) return next(err);

        res.json([advert]);
        /*res.render("front/advert/details", {
         advert: advert
         });*/
    });
};
