var Assert = require('assert');
var Type = require('./type');
var Display = require('./display')

function Asserts (tests) {
  if (Type.isFunction(tests)) { tests = tests(); };
  var results = _traverse(tests);
  console.log('');
  Display(results, 0);
  return _everyTestPassed(results);
}

function allEqual (obj, fn, expectations) {
  // if only two arguments it's just an unattached function
  if (arguments.length === 2) {
    expectations = fn;
    fn = obj;
    obj = null;
  }
  
  if (Type.isArray(expectations)) {
    expectations.forEach(function (expectation) {
      var args = expectation[0];
      if (!Type.isArray(args)) { args = [args]; }
      Assert.equal(fn.apply(obj, args), expectation[1]);
    });
    return true;

  } else if (Type.isObject(expectations)) {
    for (var arg in expectations) {
      var args = [arg];
      var expectation = expectations[arg];
      Assert.equal(fn.apply(obj, args), expectation);
    }
    return true;
  
  } else {
    throw new Error("Invalid type for expectations argument to Asserts.allEqual");
  }
};

function _everyTestPassed (obj) {
  return Object.keys(obj).every(function (label) {
    return obj[label].passed;
  });
}

function _traverse (tests) {
  var result = {}
  var test;
  var label;
  
  for (label in tests) {
    test = tests[label];
            
    if (Type.isFunction(test)) {
      // if its a function run it as a test
      result[label] = _runTest(test);
                
    } else if (Type.isObject(test)) {
      // if its an object, recurse to handle subtests
      var sub_result = _traverse(test);
      
      result[label] = {
        type: Type.RESULT_TYPE.GROUP,
        passed: _everyTestPassed(sub_result),
        items: sub_result
      };
      
    } else {
      // if its anything else, throw an error
      var test_type = Type(test).slice(1, -1).split(' ').pop();
      throw new Error("Test value must be Object or Function but type for \"" + label + "\" is " + test_type);
    }
  }
  
  return result;
}

function _runTest (test) {
  var passed, message;
  
  try {
    // run the group
    test(); 
    
    // asserts passed
    passed = true;
    message = null;
    
  } catch (error) {
    // an assert failed
    passed = false; 
    
    var diff = 'Expected ' + Display.stylize(error.expected, 'bold') + ' but got ' + Display.stylize(error.actual, 'bold');
    var error_message = '';
    if (error.message) { error_message = Display.stylize(error.message, 'underline') + ": "; }
    
    message = error_message + diff;
  }
  
  return {
    type: Type.RESULT_TYPE.ATOM,
    passed: passed,
    message: message
  };
}

module.exports = Asserts;
module.exports.allEqual = allEqual;