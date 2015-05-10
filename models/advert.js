var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

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
        type: Schema.Types.ObjectId
    }
});

schema.statics.create = function(req, callback) {

    var Advert = this;
    /*var newAdvert = new Advert(
        {
            title: req.body.title,
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            userId: req.session.user,
            created: Date.now
        }
    );*/
    var newAdvert = new Advert(
        {
            title: req.body.title,
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            userId: req.session.user
        }
    );
    newAdvert.save(function(err){
        if (err) return callback(err);
        callback(null);
    });
};

exports.Advert = mongoose.model('Advert', schema);
