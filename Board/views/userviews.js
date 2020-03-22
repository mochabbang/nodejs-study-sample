var controller = require("../controllers/userControllers");
/* render Url Mapping */

module.exports = {
  renderIndex: function(req, res) {
    res.render('users/login');
  },
  renderLogin: function(req, res) {
    controller.getLoginUser(req,res);
  },
  renderMain: function(req, res) {

    var userNickName = "";
    var userSession = req.session.userInfo;

    if (userSession) {
        userNickName = userSession.UserNickName
    }
    else {        
        res.redirect('/');
    }

    res.render('index',{ title: 'Hello Express', UserNickName: userNickName });
  }
};