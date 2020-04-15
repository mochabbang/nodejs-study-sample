var Common = {};

/*
 *    IsNullEmpty Function
 */
String.prototype.IsNullOrEmpty = function() {
  var arg = arguments[0] === undefined ? this.toString() : arguments[0];
  if (arg === undefined || arg === null || arg === "") { return true; }
  else { 
      if (typeof (arg) != "string") { throw "Property or Arguments was not 'String' Types"; }
      return false; 
  }
}

/*
 *    페이지 이동 Method
 */
Common.PageTransfer = function(param) {
    location.href = param;
}