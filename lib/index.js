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

////// allEqual
//
//
// accepts a single Array argument of sub arrays with 4 elements each:
// [object, function, arguments, expected]
//
// runs the equivalent of 
// assert.equal(<obj>.<fn>(<arguments>), <expected>)
// and returns true if all assertions succeed, false otherwise
// 
// can also pass 3 element array when testing unattached function (no object)

function allEqual (expectations) {
  if (!Type.isArray(expectations)) {
    throw new Error("Argument to Asserts.allEqual should be array");
  }

  expectations.forEach(function (expectation) {
    if (expectation.length == 3) {
      expectation = [null].concat(expectation);
    }
    var obj = expectation[0];
    var fn = expectation[1];
    var args = expectation[2];
    var expected = expectation[3];
    
    // if arguments is a single atom, wrap it as an array
    if (!Array.isArray(args)) { args = [args]; }
    
    Assert.equal(fn.apply(obj, args), expected);    
  });
  return true;
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