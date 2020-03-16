var express = require('express');
var router = express.Router();

var controller = require("../controllers/userControllers");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'UserLogin' });
});

router.post('/login', function(req, res, next) {  
  controller.getLoginUser(req, res);
});

module.exports = router;
