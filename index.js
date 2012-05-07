(function() { 
  var assert = require('assert');
   
  var type       = function(obj) { return {}.toString.call(obj); };
  var isFunction = function(obj) { return (type(obj) === '[object Function]'); };
  var isObject   = function(obj) { return (type(obj) === '[object Object]'); };
  var isArray    = function(obj) { return (type(obj) === '[object Array]'); };
  
  var asserts = function(tests) {
    var results = traverse(tests);
    console.log('');
    display(results, 0);
  };
  
  var assertApply = function(expectation, fn, obj, args) {
    if (!(isArray(args) && args.length > 0)) { args = [args]; }
    assert.equal(expectation, fn.apply(obj, args));
  }
  
  var allEqual = function(obj, fn, expectations) {
    if (arguments.length === 2) {
      expectations = fn;
      fn = obj;
      obj = null;
    }
    
    if (isArray(expectations)) {
      if ((expectations.length % 2) !== 0) {
        throw new Error("Expectations argument as array to asserts.allEqual must have even number of elements")
      }
      for (var i = 0; i < expectations.length; i += 2) {
        assertApply(expectations[i], fn, obj, expectations[i + 1]);
      }
      
      
    } else if (isObject(expectations)) {
      for (var e in expectations) {
        var args = expectations[e];
        assertApply(e, fn, obj, args);
      }
    
    } else {
      throw new Error("Invalid type for expectations argument to asserts.allEqual")
    }
  };
  
  module.exports = asserts;
  module.exports.allEqual = allEqual;
    
  var traverse = function(tests) {
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
        
        var passed = true;
        var sub_label;
        for (sub_label in sub_result) {
          if (!sub_result[sub_label].passed) {
            passed = false;
            break;
          }
        }

        result[label] = {
          type: "group",
          passed: passed,
          items: sub_result
        };
      
      } else {
        // if its anything else, throw an error
        var test_type = type(test).slice(1, -1).split(' ').pop();
        throw new Error("Test value must be Object or Function but type for \"" + label + "\" is " + test_type);
      }
    }
    
    return result;
  };
  
  var runTest = function(test) {
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
  };
  
  var display = function(results, level) {
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
  var styles_map = {
    'bold'      : ['\033[1m',  '\033[22m'],
    'underline' : ['\033[4m',  '\033[24m'],
    'green'     : ['\033[32m', '\033[39m'],
    'red'       : ['\033[31m', '\033[39m'],
  };
  
  var stylize = function(str, styles) {
    if (!isArray(styles)) { styles = [styles]; }
    
    styles.forEach(function(style) {
      style = styles_map[style];
      str = style[0] + str + style[1];
    });
    
    return str;
  };
  
  var indent = function(length) {
    var result = '';
    for (;length > 0; length--) { result += ' '; }
    return result;
  };
})();

