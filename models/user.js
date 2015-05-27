var crypto = require('crypto');
var async = require('async');
var util = require('util');
var log = require('libs/log')(module);

var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    login: {
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
    },
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
    isAdmin:{
        type: Boolean
    }
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

schema.statics.authorize = function(login, password, callback) {
    var User = this;

    async.waterfall([
        function(callback) {
            User.findOne({login: login}, callback);
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

schema.statics.registration = function(login, password, callback) {
    var User = this;

    async.waterfall([
        function(callback) {
            User.findOne({login: login}, callback);
        },
        function(user, callback) {
            console.log(reg);
            console.log(user);
            if (!user) {
                if(password){
                    var newUser = new User({login: login, password: password, isAdmin: false, firstname: "", lastname:"", phone: 0});
                    newUser.save(function(err) {
                        if (err) return callback(err);
                        callback(null, newUser);
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

schema.statics.getUserById = function(id, callback) {
    var User = this;

    User.find({_id : id}, function(err, user){
        if(err) return callback(err);

        callback(null, user);
    });
};

schema.statics.edit = function(req, callback) {

    var User = this;

    User.find({login: req.body.login}, function(err, user){
        if(err) return callback(err);

        user.forEach(function(item){

            if(item._id == req.body.id){
                User.update(
                    {
                        _id: req.body.id
                    },
                    {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        phone: req.body.phone,
                        isAdmin: req.body.isAdmin
                    },{
                        multi: true
                    } ,
                    function(err){
                        if(err) callback(err);
                        callback(null);
                    }
                );
            } else {
                callback(new Error("login zanyat"));
            }
        });

        User.update(
            {
                _id: req.body.id
            },
            {
                login: req.body.login,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                isAdmin: req.body.isAdmin
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

schema.statics.create = function(req, callback) {

    var User = this;

    User.find({login: req.body.login}, function(err, user){
        if(err) return callback(err);

        user.forEach(function(item){
            callback(new Error("login zanyat"));
        });

        var newuser = new User(
            {
                login: req.body.login,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                isAdmin: req.body.isAdmin,
                phone: req.body.phone
            }
        );

        newuser.save(function(err){
            if (err) return callback(err);
            callback(null);
        });
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
