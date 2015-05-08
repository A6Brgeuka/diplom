var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    role: {
        type: String,
        required: true,
        unique: true,
        default: "User"
    }
});

exports.Role = mongoose.model('Role', schema);
