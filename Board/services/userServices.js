var dbContext = require("../database/context");
var TYPES = require('tedious').TYPES;
var commonJs = require("../js/common");

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
          results.resultMsg = "error";
        }
        callback(results);
    });
  }
}

/* Insert DataBase User Join */
function SetUserJoin(user, callback) {
    var results = {};  
    var query = "UP_NODEJSBOARD_USER_INSERT";
    var params = [];

    if(commonJs.IsNullOrUndefined(user)) {
        results.resultCode = "100";
        results.resultMsg = "입력된 정보가 없습니다.";
        callback(results);
    }
    else {
        params.push({name: 'UserID', type: TYPES.NVarChar, val: user.userId});
        params.push({name: 'UserName', type: TYPES.NVarChar, val: user.userName});
        params.push({name: 'UserPassword', type: TYPES.NVarChar, val: user.userPwd});
        params.push({name: 'UserEmail', type: TYPES.NVarChar, val: user.userEmail});
        params.push({name: 'UserNickName', type: TYPES.NVarChar, val: user.userNickName});

        dbContext.post(query, params, function(err, data){
            if (data) {
              
              if(data[0].RltCode == "S") {
                  results.resultCode = "0";
                  results.resultMsg = "등록완료";
              }
              else {
                  results.resultCode = "1";
                  results.resultMsg = "사용자가 존재합니다.";
              }
            }
            else {
              results.resultCode = "999";
              results.resultMsg = "error";
            }
            callback(results);
        });
    }
}

module.exports = {
  getLoginUser : GetLoginUser,
  setUserJoin : SetUserJoin
};