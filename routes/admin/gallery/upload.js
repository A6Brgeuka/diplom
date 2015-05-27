exports.post = function(req, res){
    var file = req.files.file;
    console.log(file.name);
    console.log(file.type)
};