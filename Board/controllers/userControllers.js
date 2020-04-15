var services = require("../services/userServices");
var userModel = require("../models/user");
var commonJs = require("../js/common");

/* User Login */
 function GetLoginUser(req,res) {
  
  try {            
      return services.getLoginUser(req, function (data) {
          res.status(200).json({ status: 200, data: data });
      });      
  } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
  }
  
}

/* User Join */
function SetUserJoin(req,res) {
  try {
     if(commonJs.IsNullOrUndefined(req)) {
        return res.status(400).json({ status: 400, message: "Request parameter not Exists" });
     }
     else {
        if (!commonJs.IsNullOrUndefined(req.body)) {
           userModel.userID = req.body.userID;
           userModel.userName = req.body.userName;
           userModel.userPwd = req.body.userPwd;
           userModel.userEmail = req.body.userEmail;
           userModel.userNickName = req.body.userNickName;

           return services.setUserJoin(userModel, function(data){
              res.status(200).json({ status: 200, data: data });
           });
        }
        else {
            res.status(200).json({ status: 200, data: {resultCode: "100", resultMsg: "사용자정보가 없습니다."}});
        }
     }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

module.exports = {
  getLoginUser: GetLoginUser,
  setUserJoin: SetUserJoin
}