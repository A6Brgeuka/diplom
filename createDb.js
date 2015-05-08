var mongoose = require('libs/mongoose');
var async = require('async');
var ObjectID = require('mongodb').ObjectID;
//var User = require('models/user').User;
//var Role =

async.series([
    open,
    dropDatabase,
    requiredModels,
    createRole,
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
    require('models/role');
    //require('models/role');

    async.each(Object.keys(mongoose.models), function(modelName, callback){
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createRole(callback){
    var roles = [
        {role: "Administrator"},
        {role: "User"}
    ];
    async.each(roles, function(roleData, callback){
        var role = new mongoose.models.Role(roleData);
        role.save(callback);
    }, callback)
}

function createUser(callback){

    mongoose.models.Role.find({} ,function(err, roles){
        if(err) throw err;

        var roleIdAdmin = roles[0]._id;
        var roleIdUser = roles[1]._id;


        console.log(roles);

        var users = [
            {username: "admin",password: "admin", roleId: roleIdAdmin},
            {username: "user1",password: "user1", roleId: roleIdUser},
            {username: "user2",password: "user2", roleId: roleIdUser}
        ];
        async.each(users, function(userData, callback){
            var user = new mongoose.models.User(userData);
            user.save(callback);
        }, callback)
    });
}