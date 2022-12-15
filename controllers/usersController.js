const passport = require('passport');
const User = require('../models/user');

const renderSignUpForm = async(req, res) => {
    res.render('users/signup');    
}

const signUp = async(req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if(password !== confirm_password) {
        errors.push({msg: 'Passwords do not match'});
    }
    if(password.length < 4) {
        errors.push({msg: 'Password must be at least 4 characters'});
    }
    if(errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email
        });
    }else {
        const userEmail = await User.findOne({email});
        if(userEmail) {
            req.flash('error_msg','The email is already in use');
            res.redirect('/users/signup');
        }else {
            const user = new User({name, email, password});
            user.password = await user.encryptPassword(password);
            await user.save();
            req.flash('success_msg','You are registered');
            res.redirect('/users/signin');
        }
    }
}

const renderSignInForm = async(req, res) => {
    res.render('users/signin');    
}

const signIn = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});

const logOut = async(req, res) => {
    req.logout(err => {
        if(err) return next(err);

        req.flash('success_msg', 'You are logged out');
        res.redirect('/users/signin');
    });
}


module.exports = {
    renderSignUpForm,
    renderSignInForm,
    signUp,
    signIn,
    logOut
}