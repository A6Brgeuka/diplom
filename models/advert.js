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

exports.Advert = mongoose.model('Advert', schema);
