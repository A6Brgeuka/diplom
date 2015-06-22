var Category = require('models/category').Category;
var ObjectID = require('mongodb').ObjectID;

exports.get = function(req, res, next){

    try{
        var id = new ObjectID(req.query.id);
    }
    catch (e){
        return next(e);
    }

    Category.getCategoryById(id, function(err, category){
        if(err) return next(err);

        res.json([category]);
    });
};
