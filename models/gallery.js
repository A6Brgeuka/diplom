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
   images:[{
       type: String
   }]
});



exports.Gallery = mongoose.model('Gallery', schema);