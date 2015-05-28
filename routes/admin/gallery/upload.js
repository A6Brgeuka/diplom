var Gallery = require('models/gallery').Gallery;

exports.post = function(req, res){

    console.log(req.files);
    //console.log(req.body);
    var arr = req.files.file.path.split('\\');
    //console.log(arr);
    //console.log(arr[5]);
    console.log("return res");
    res.status(200).end();

};