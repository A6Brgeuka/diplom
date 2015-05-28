var mongoose = require('libs/mongoose');
var async = require('async');
var ObjectID = require('mongodb').ObjectID;
//var User = require('models/user').User;
//var Role =

async.series([
    open,
    dropDatabase,
    requiredModels,
    createUser
], function(err, result){
    console.log("OK");
    mongoose.disconnect();
});

function open(callback){
    mongoose.connection.on('open', callback)
}

function dropDatabase(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback)
}
function requiredModels(callback){
    require('models/user');
    //require('models/role');

    async.each(Object.keys(mongoose.models), function(modelName, callback){
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUser(callback){

        var users = [
            {login: "admin", password: "admin", name: {firstname: "admin", lastname:"admin"}, isAdmin: true},
            {login: "user1", password: "user1", name: {firstname: "user1", lastname:"user1"}, isAdmin: false},
            {login: "user2", password: "user2", name: {firstname: "user2", lastname:"user2"}, isAdmin: false}
        ];
        async.each(users, function(userData, callback){
            var user = new mongoose.models.User(userData);
            user.save(callback);
        }, callback)

}