var assert = require('assert');
 
function type (obj) { return {}.toString.call(obj); }
function isFunction (obj) { return (type(obj) === '[object Function]'); }
function isObject (obj) { return (type(obj) === '[object Object]'); }
function isArray (obj) { return (type(obj) === '[object Array]'); }

function asserts (tests) {
  if (isFunction(tests)) { tests = tests(); };
  var results = traverse(tests);
  console.log('');
  display(results, 0);
  return everyTestPassed(results);
}

function allEqual (obj, fn, expectations) {
  // if only two arguments it's just an unattached function
  if (arguments.length === 2) {
    expectations = fn;
    fn = obj;
    obj = null;
  }
  
  if (isArray(expectations)) {
    expectations.forEach(function (expectation) {
      var args = expectation[0];
      if (!isArray(args)) { args = [args]; }
      assert.equal(fn.apply(obj, args), expectation[1]);
    });
    return true;

  } else if (isObject(expectations)) {
    for (var arg in expectations) {
      var args = [arg];
      var expectation = expectations[arg];
      assert.equal(fn.apply(obj, args), expectation);
    }
    return true;
  
  } else {
    throw new Error("Invalid type for expectations argument to asserts.allEqual");
  }
};

function everyTestPassed (obj) {
  return Object.keys(obj).every(function (label) {
    return obj[label].passed;
  });
}

function traverse (tests) {
  var result = {}
  var test;
  var label;
  
  for (label in tests) {
    test = tests[label];
            
    if (isFunction(test)) {
      // if its a function run it as a test
      result[label] = runTest(test);
                
    } else if (isObject(test)) {
      // if its an object, recurse to handle subtests
      var sub_result = traverse(test);
      
      result[label] = {
        type: "group",
        passed: everyTestPassed(sub_result),
        items: sub_result
      };
    
    } else {
      // if its anything else, throw an error
      var test_type = type(test).slice(1, -1).split(' ').pop();
      throw new Error("Test value must be Object or Function but type for \"" + label + "\" is " + test_type);
    }
  }
  
  return result;
}

function runTest (test) {
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
    
    var diff = 'Expected ' + stylize(error.expected, 'bold') + ' but got ' + stylize(error.actual, 'bold');
    var error_message = '';
    if (error.message) { error_message = stylize(error.message, 'underline') + ": "; }
    
    message = error_message + diff;
  }
  
  return {
    type: "atom",
    passed: passed,
    message: message
  };
}

function display (results, level) {
  var label, emo, color, output;
  var emo_indent = 3;
  var level0 = (level === 0);
      
  for (label in results) {
    result = results[label];
    
    if (result.passed) {
      emo = ':)';
      color = 'green';
      
    } else {   
      emo = ':('
      color = 'red';
    } 
    
    output = (level0 ? (emo + ' ') : '') + label;
    console.log(indent(level) + stylize(output, ['bold', color]));
    
    if (result.type === 'atom') {
      if (!result.passed) {
        var indent_level = level0 ? (emo_indent + 1) : (level + 1);
        console.log(indent(indent_level) + stylize(result.message, 'red'));
      }
      
    } else {
      var new_level = (level0 ? emo_indent : level) + 1;
      display(result.items, new_level);
    }
    
    if (level0) { console.log(); }
  }
}

// adapted from https://github.com/Marak/colors.js/blob/master/colors.js
function stylize (str, styles) {
  var styles_map = {
    'bold'      : ['\033[1m',  '\033[22m'],
    'underline' : ['\033[4m',  '\033[24m'],
    'green'     : ['\033[32m', '\033[39m'],
    'red'       : ['\033[31m', '\033[39m'],
  };
  
  if (!isArray(styles)) { styles = [styles]; }
  
  styles.forEach(function(style) {
    style = styles_map[style];
    str = style[0] + str + style[1];
  });
  
  return str;
}

function indent (length) {
  var result = '';
  for (;length > 0; length--) { result += ' '; }
  return result;
}

module.exports = asserts;
module.exports.allEqual = allEqual;
module.exports.stylizeError = stylize;