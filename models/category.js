var async = require('async');

var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name:{
        type: String,
        unique: true,
        required: true
    }
});

schema.statics.create = function(req, callback) {

    var Category = this;

    Category.find({name: req.body.name}, function(err, post){
        if(err) return callback(err);

        console.log("ASD");

        var newcategory= new Category(
            {
                name: req.body.name
            }
        );

        newcategory.save(function(err){
            if (err) return callback(err);
            callback(null);
        });
    });
};

schema.statics.getCategories = function(callback) {

    var Category = this;

    Category.find({}, function(err, categories){
        if(err) throw err;

        callback(null, categories);
    })

};

/*schema.statics.getPostByIdFront = function(id, callback) {

    var Post = this;

    Post.find({_id: id})
        .populate('Author')
        .exec(function(err, post){
            if(err) throw err;

            callback(null, post);
        });
};*/

schema.statics.getCategoryById = function(id, callback) {

    var Category = this;

    Category.findById(id , function(err, category){
        if(err) callback(err);


        callback(null, category);
    });
};

schema.statics.edit = function(req, callback) {

    var Category = this;

    Category.find({name: req.body.name}, function(err, category){
        if(err) return callback(err);

        category.forEach(function(item){

            callback(new Error("Name zanyat"));
        });

        Category.update(
            {
                _id: req.body.id
            },
            {
                name: req.body.name
            },
            function(err){
                if(err) callback(err);

                callback(null);
            }
        );

    });
};

schema.statics.removeCategory = function(id, callback) {
    var Category = this;

    Category.remove(
        {
            _id: id
        }
        , function(err){
            if(err) callback(err);
            callback(null);
        }
    );
};

exports.Category = mongoose.model('Category', schema);