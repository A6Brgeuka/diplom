var crypto = require('crypto');
var async = require('async');
var util = require('util');
var Role = require('models/role').Role;

var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstname :{
        type: String
    },
    lastname:{
        type: String
    },
    phone:{
        type: Number
    }
    ,
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    roleId:[{
        type: Schema.Types.ObjectId,
        ref : 'Role'
    }]
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(username, password, callback) {
    var User = this;

    async.waterfall([
        function(callback) {
            User.findOne({username: username}, callback);
        },
        function(user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new AuthError("Invalid password"));
                }
            } else {
                    callback(new AuthError("User does not exist"));
            }
        }
    ], callback);
};

schema.statics.registration = function(username, password, callback) {
    var User = this;
    async.waterfall([
        function(callback) {
            User.findOne({username: username}, callback);
        },
        function(user, callback) {
            if (!user) {
                if(password){
                    Role.findOne({role:"User"}, function(err, role){
                        var newUser = new User({username: username, password: password, roleId:role._id, firstname: "", lastname:"", phone: null});
                        newUser.save(function(err) {
                            if (err) return callback(err);
                            callback(null, newUser);
                        });
                    });
                } else {
                    callback(new AuthError("Password is not valid"));
                }

            } else {
                callback(new AuthError("User exist"));
            }
        }
    ], callback);
};

schema.statics.getUsers = function(callback) {
    var User = this;

    User.find({}, function(err, users){
        if(err) return callback(err);
        callback(null, users);
    });
};

schema.statics.getCurrentUsers = function(req, callback) {
    var User = this;

    User.find({_id : req.session.user}, function(err, user){
        if(err) return callback(err);
        callback(null, user);
    });
};

exports.User = mongoose.model('User', schema);

function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;
