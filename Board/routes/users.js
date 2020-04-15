/* router Setting */
var express = require('express');
var router = express.Router();
var userviews = require('../renders/userviews');


/* users listing. */
router.get('/', userviews.renderIndex);
router.post('/login', userviews.renderLogin);
router.get('/index', userviews.renderMain);
router.get('/userJoin', userviews.renderUserJoin);
router.post('/userJoin', userviews.renderInsertUser);

module.exports = router;
