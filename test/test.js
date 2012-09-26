var assert = require('assert');
var asserts = require('../');

try {

  var test1 = asserts(function () {
    var blah = "blah";
    return {
      ack: function () {
        assert.equal(blah, "blah");
      },
      smack: function () {
        assert.equal("hi", "hi");
      }
    };
  });
  
  assert.equal(test1, true);
  
  var test2 = asserts({
    something: {
      yes: function () {
        assert.equal(1, 1);
      },
      no: function () {
        assert.equal("hi", "fail");
      }
    }
  });
  
  assert.equal(test2, false);
  
  function plus2 (x) { return x + 2; };
  
  var test3 = asserts.allEqual(plus2, [[2, 4], [5, 7], [111111, 111113]]);
  assert.equal(test3, true);
  
  var str = "hihi";
  var test4 = asserts.allEqual(str, str.indexOf, {
    h: 0,
    hi: 0,
    i: 1
  });
  assert.equal(test4, true);
  
  console.log(asserts.stylizeError("----------------\nTEST TEST PASSED\n----------------", ['bold', 'green']));

} catch (error) {
  console.log("Test Failed.");
  console.log("   Expected: " + error.expected);
  console.log("     Actual: " + error.actual); 
  console.log(error);
  
  console.log(asserts.stylizeError("----------------\nTEST TEST FAILED\n----------------", ['bold', 'red']));
  
}