/* router Setting */
var express = require('express');
var router = express.Router();
var userviews = require('../views/userviews');


/* users listing. */
router.get('/', userviews.renderIndex);
router.post('/login', userviews.renderLogin);
router.get('/index', userviews.renderMain);


module.exports = router;
