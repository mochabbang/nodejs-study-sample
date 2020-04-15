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

Common.IsNullOrUndefined = function(arg) {
    if (arg === undefined || arg === null) 
        return true;
    else 
        return false;
}

Common.IsNullOrEmpty = function(arg) {
    if (arg === undefined || arg === null) { throw "Property or Arguments was Never Null"; } else {
      if (typeof (arg) != "string") { throw "Property or Arguments was not 'String' Types"; }
      else { return arg.IsNullOrEmpty(); }
    }
}

module.exports = Common;