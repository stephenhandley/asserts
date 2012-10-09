var Assert = require('assert');
var Asserts = require('../lib');
var Display = require('../lib/display');

try {

  var test1 = Asserts((function () {
    var blah = "blah";
    
    return {
      ack: function () {
        Assert.equal(blah, "blah");
      },
      smack: function () {
        Assert.equal("hi", "hi");
      }
    };
  })());
  
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
  
  var test3 = Asserts.allEqual([
    [plus2, 2, 4], 
    [plus2, 5, 7], 
    [plus2, 111111, 111113]
  ]);
  Assert.equal(test3, true);
  
  var str = "hihi";
  var indexOf = str.indexOf;
  var test4 = Asserts.allEqual([
    [str, indexOf, "h", 0],
    [str, indexOf, "hi", 0],
    [str, indexOf, "i", 1],
    [str, indexOf, "b", -1]
  ]);
  Assert.equal(test4, true);
  
  
  function addThree (x, y, z) {
    return x + y + z;
  }
  var test5 = Asserts.allEqual([
    [addThree, [1, 2, 3], 6],
    [addThree, [10, 10, 10], 30]
  ]);
  Assert.equal(test5, true);
  
  // TODO add test for Asserts.dir
  
  console.log(Display.stylize("----------------\nTEST TEST PASSED\n----------------", ['bold', 'green']));

} catch (error) {
  console.log("Test Failed.");
  console.log("   Expected: " + error.expected);
  console.log("     Actual: " + error.actual); 
  console.log(error);
  
  console.log(Display.stylize("----------------\nTEST TEST FAILED\n----------------", ['bold', 'red']));
  
}