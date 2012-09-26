function type (obj) { return {}.toString.call(obj); }
function isFunction (obj) { return (type(obj) === '[object Function]'); }
function isObject (obj) { return (type(obj) === '[object Object]'); }
function isArray (obj) { return (type(obj) === '[object Array]'); }

module.exports = type;
module.exports.isFunction = isFunction;
module.exports.isObject = isObject;
module.exports.isArray = isArray;
module.exports.RESULT_TYPE = {
  ATOM: 1,
  GROUP: 2
}
