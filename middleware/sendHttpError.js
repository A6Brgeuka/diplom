module.exports = function(req, res, next) {

    res.sendHttpError = function(error) {

        res.status(error.status);
        if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') { //ajax
            res.json(error);
        } else {
            res.render("front/error", {error: error});
        }
    };

    next();

};