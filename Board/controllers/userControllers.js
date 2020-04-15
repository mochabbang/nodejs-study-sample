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
           var user = userModel.User(req.body);

           return services.setUserJoin(user, function(data){
              if(!commonJs.IsNullOrUndefined(data)) {
                  if(data.resultCode === "0") {
                     res.writeHead("200", {'Content-Type':'text/html; charset=utf-8' });
                     res.write("<script>alert('회원가입 되었습니다.'); location.href='/';</script>");
                     res.end();
                  }
                  else {
                     res.write("<script>alert('" + data.resultMsg + "');</script>");
                  }
              }
              else 
                  res.status(200).json({ status: 200, data: {resultCode: "999", resultMsg: "Insert Error"}});
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