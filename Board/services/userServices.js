var dbContext = require("../database/context");
var TYPES = require('tedious').TYPES;
var commonJs = require("../common/common");

/* Select DataBase Login User */
function GetLoginUser(req, callback) {
  var results = {};  
  var query = "UP_NODEJSBOARD_USER_SELECT";
  var params = [];  
  var requestParam = req.body;

  // session init
  var userSession = req.session;
  
  if  (commonJs.IsNullOrEmpty(requestParam.userId) || commonJs.IsNullOrEmpty(requestParam.userPwd)) {
      results.resultCode = "100";
      results.resultMsg = "로그인정보를 입력해주세요.";
      callback(results);
  }
  else {
    params.push({name: 'UserID', type: TYPES.NVarChar, val: requestParam.userId});
    params.push({name: 'UserPassword', type: TYPES.NVarChar, val: requestParam.userPwd});

    dbContext.post(query, params, function(err,data){
        if (data) {
          
          if(data.length == 1) {
            userSession.userInfo = {
              UserName: data[0].UserName,
              UserNickName: data[0].UserNickName,
              UserEmail: data[0].UserEmail
            };
          }

          results.resultCode = "0";
          results.resultMsg = "조회완료";
        }
        else {
          results.resultCode = "999";
          results.resultMsg = err;
        }
        callback(results);
    });
  }
}

module.exports = {
  getLoginUser : GetLoginUser
};