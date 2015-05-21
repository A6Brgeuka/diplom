var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;
var User = require('models/user').User;

var schema = new Schema({
    title: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    shortDescription:{
        type: String,
        required: true
    },
    longDescription:{
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String
    }
});

schema.statics.create = function(req, callback) {

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

schema.statics.edit = function(req, callback) {

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
schema.statics.getAdverts = function(callback) {

    var Advert = this;

    Advert.find({}, function(err, adverts){
        if(err) callback(err);

        callback(null, adverts);
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
        {name: req.body._id},
        {
            //title: req.body.title,
            name: "Name2"
            /*shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription*/
        } , function(err){
                if(err) callback(err);
                callback(null);
        }
    );
};


exports.Advert = mongoose.model('Advert', schema);
