exports.post = function(req, res) {
    req.session.destroy();
    res.json();
    /*res.redirect('/');*/
};