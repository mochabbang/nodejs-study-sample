var services = require("../services/userServices");

/* User Login */
 function GetLoginUser(req,res) {
  
  try {
      console.log(req);
      
      return services.getLoginUser(req, function (data) {
          res.status(200).json({ status: 200, data: data });
      });      
  } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
  }
  
}

module.exports = {
  getLoginUser: GetLoginUser
}