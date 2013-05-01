var Assert = require('assert');
var Asserts = require('../lib/');

Asserts({
  "foo": function() {
    Assert.equal("something", "something", "optional message");
    Assert.equal(2, 2);
  },
  "barf" : {
    "ing": function () {
      Assert.equal(1, 1, "okay");
    },
    "ed": function() {
      Assert.equal(2, 2, "yep");
    }
  }
}, function(error) {
  console.log("HAPPY");
});