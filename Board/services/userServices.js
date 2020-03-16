var dbContext = require("../database/context");
var TYPES = require('tedious').TYPES;
var commonJs = require("../common/common");


function GetLoginUser(req, callback) {
  var results = {};  
  var query = "UP_NODEJSBOARD_USER_SELECT";
  var params = [];
  
  if  (commonJs.IsNullOrEmpty(req.userId) || commonJs.IsNullOrEmpty(req.userPwd)) {
      results.resultCode = "100";
      results.resultMsg = "로그인정보를 입력해주세요.";
      callback(results);
  }
  else {
    params.push({name: 'UserID', type: TYPES.NVarChar, val: req.userId});
    params.push({name: 'UserPassword', type: TYPES.NVarChar, val: req.userPwd});

    dbContext.post(query, params, function(err,data){
        if (data) {
          results.data = data[0];
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