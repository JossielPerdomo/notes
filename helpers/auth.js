//Authentication for route proctection

const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'Not authorized');
    res.redirect('/users/signin');
}

module.exports = {
    isAuthenticated
}