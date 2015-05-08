var HttpError = require('error').HttpError;
var User = require('models/user').User;
var Role = require('models/role').Role;
var ObjectID = require('mongodb').ObjectID;

module.exports = function(req, res, next) {
    User.findById(req.session.user, function(err, user){

        if(err) return next(err);
        /*console.log(user);
        var idOb = user.roleId;
        try{
            var id = new ObjectID(idOb);
        }
        catch (e){
            console.log("pizda");
            console.log(id);
            console.log(idOb);
            return next(403);
        }*/

        Role.findById(user.roleId, function(err, role){

            if(err) return next(err);
            if(role == null){
                return next(new HttpError(500, "FATAL ERROR"));
            }
            if(role.role == "Administrator"){
                next();
            } else {
                next(new HttpError(403, "Access denied"));
            }
        })
    });
};