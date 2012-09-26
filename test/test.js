var Assert = require('assert');
var Asserts = require('../lib');
var Display = require('../lib/display');

try {

  var test1 = Asserts(function () {
    var blah = "blah";
    return {
      ack: function () {
        Assert.equal(blah, "blah");
      },
      smack: function () {
        Assert.equal("hi", "hi");
      }
    };
  });
  
  Assert.equal(test1, true);
  
  var test2 = Asserts({
    something: {
      yes: function () {
        Assert.equal(1, 1);
      },
      no: function () {
        Assert.equal("hi", "fail");
      }
    }
  });
  
  Assert.equal(test2, false);
  
  function plus2 (x) { return x + 2; };
  
  var test3 = Asserts.allEqual(plus2, [[2, 4], [5, 7], [111111, 111113]]);
  Assert.equal(test3, true);
  
  var str = "hihi";
  var test4 = Asserts.allEqual(str, str.indexOf, {
    h: 0,
    hi: 0,
    i: 1
  });
  Assert.equal(test4, true);
  
  console.log(Display.stylize("----------------\nTEST TEST PASSED\n----------------", ['bold', 'green']));

} catch (error) {
  console.log("Test Failed.");
  console.log("   Expected: " + error.expected);
  console.log("     Actual: " + error.actual); 
  console.log(error);
  
  console.log(Display.stylize("----------------\nTEST TEST FAILED\n----------------", ['bold', 'red']));
  
}