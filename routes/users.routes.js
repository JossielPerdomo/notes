const { Router } = require('express');
const router = Router();

const { renderSignUpForm, renderSignInForm, signIn, signUp, logOut } = require('../controllers/usersController');

//Create a new user
router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', signUp);

//SignIn
router.get('/users/signin', renderSignInForm);
router.post('/users/signin', signIn);

//Logout
router.get('/users/logout', logOut);


module.exports = router;