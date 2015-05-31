var Gallery = require('models/gallery').Gallery;

exports.post = function(req, res){

    var arr = req.files.file.path.split('\\');

    console.log(req.files);

    Gallery.createInsert(req, arr[5], function(err){
        if(err){
            console.log("ERROR UPLOAD");
            return res.status(500).end();
        } else {
            return res.status(200).end();
        }
    });
    //console.log(arr);
    //console.log(arr[5]);
};