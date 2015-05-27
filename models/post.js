var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;
var User = require('models/user').User;

var schema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    /*state:{
        type: String,
        required: true
    },*/


    content:{
       brief:{
           type: String
       },
       extended:{
           type: String
       }
     },
    brief:{
        type: String
    },
    extended:{
        type: String
    }
    ,
    publishedDate: {
        type: Date,
        default: Date.now
    },
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

schema.statics.create = function(req, callback) {

    var Post = this;

    Post.find({title: req.body.title}, function(err, post){
        if(err) return callback(err);

        post.forEach(function(item){
            callback(new Error("title zanyat"));
        });

        var newpost = new Post(
            {
                title: req.body.title,
                content:{
                    brief:req.body.brief,
                    extended:req.body.extended
                },
                brief : req.body.brief,
                extended: req.body.extended,
                Author: req.session.user
            }
        );

        newpost.save(function(err){
            if (err) return callback(err);
            callback(null);
        });
    });
};

schema.statics.getPosts = function(callback) {

    var Post = this;

    Post.find({})
        .populate('Author')
        .exec(function(err, posts){
            if(err) throw err;

            callback(null, posts);
        });

};

schema.statics.getPostByIdFront = function(id, callback) {

    var Post = this;

    Post.find({_id: id})
        .populate('Author')
        .exec(function(err, post){
            if(err) throw err;
            console.log(post);
            //console.log(posts);
            callback(null, post);
        });
};

schema.statics.getPostById = function(id, callback) {

    var Post = this;

    Post.findById(id , function(err, post){
        if(err) callback(err);

        //console.log(post);
        callback(null, post);
    });
};

schema.statics.edit = function(req, callback) {

    var Post = this;

    Post.find({title: req.body.title}, function(err, post){
        if(err) return callback(err);

        post.forEach(function(item){

            if(item._id == req.body.id){
                Post.update(
                    {
                        _id: req.body.id
                    },
                    {
                        brief: req.body.brief,
                        extended: req.body.extended,
                        Author: req.body.Author
                    },{
                        multi: true
                    } ,
                    function(err){
                        if(err) callback(err);
                        callback(null);
                    }
                );
            } else {
                callback(new Error("title zanyat"));
            }
        });

        Post.update(
            {
                _id: req.body.id
            },
            {
                title: req.body.title,
                brief: req.body.brief,
                extended: req.body.extended,
                Author: req.body.Author
            },{
                multi: true
            } ,
            function(err){
                if(err) callback(err);
                callback(null);
            }
        );

    });
};
/*schema.statics.edit = function(req, callback) {

    var Advert = this;

    User.findById(req.session.user, function(err, user){
        if(err) return next(err);

        var newAdvert = new Advert(
            {
                title: req.body.title,
                name: req.body.name,
                shortDescription: req.body.shortDescription,
                longDescription: req.body.longDescription,
                userId: user.username
            }
        );
        newAdvert.save(function(err){
            if (err) return callback(err);
            callback(null);
        });
    });
};


schema.statics.getAdvertById = function(id, callback) {

    var Advert = this;

    Advert.findById(id , function(err, advert){
        if(err) callback(err);

        callback(null, advert);
    });
};

schema.statics.advertUpdate = function(req, callback) {
    var Advert = this;

    Advert.update(
        {
            _id: req.body._id
        },
        {
            title: req.body.title,
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription
        },{
            multi: true
        } , function(err){
                if(err) callback(err);
                callback(null);
        }
    );
};

schema.statics.advertDelete = function(id, callback) {
    var Advert = this;

    Advert.remove(
        {
            _id: id
        }
        , function(err){
            if(err) callback(err);
            callback(null);
        }
    );
};*/


exports.Post = mongoose.model('Post', schema);
