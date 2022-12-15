const { Router } = require('express');
const router = Router();
const { renderHome, renderAbout } = require('../controllers/indexController');

router.get('/', renderHome);

router.get('/about', renderAbout);

module.exports = router