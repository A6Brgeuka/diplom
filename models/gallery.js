var async = require('async');

var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name:{
       type: String,
       unique: true,
       required: true
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
    images:[
        {
            url: String
        }
    ],
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

schema.statics.getgalleries = function(callback) {

    var Gallery = this;

    Gallery.find({})
        .populate('Author')
        .exec(function(err, galleries){
            if(err) throw err;

            callback(null, galleries);
        });
};

schema.statics.createInsert = function(req, name, callback) {

    var Gallery = this;

    async.waterfall([
        function(callback){
            Gallery.findOne({name:req.body.nameGallery}, callback)
        },
        function(gallery, callback){
            if(gallery){
                Gallery.findOneAndUpdate(
                    {
                        name: req.body.nameGallery
                    },
                    {
                        $push: {
                            images:{
                                url: '/admin/images/' + name
                            },
                            Author: req.session.user
                        }
                    }
                    ,
                    {
                        safe: true,
                        upsert: true
                    },
                    function(err){
                        if(err) callback(err);

                        callback(null);
                    }
                );
            } else {
                var newGallery = new Gallery(
                    {
                        name: req.body.nameGallery,
                        images:[{
                            url: '/admin/images/' + name
                        }],
                        Author: req.session.user
                    }
                );
                newGallery.save(function(err){
                    if(err) callback(err);

                    callback(null);
                });
            }
        }
    ], callback);
    /*Gallery.find({name: req.body.nameGallery}, function(err, gallery){
        if(err) return callback(err);




        /*gallery.forEach(function(item){
            callback(null, gallery.name);
        });
        console.log("1");

        var newGallery = new Gallery(
            {
                name: req.body.nameGallery,
                images:[{
                    url: '/admin/images/' + name
                }]
            }
        );
        console.log("1 2");
        newGallery.save(function(err){
            if (err) return callback(err);
            console.log("1 2 3");
            callback(null, null);
        });
        console.log("1 2 3 4");*/

};



exports.Gallery = mongoose.model('Gallery', schema);