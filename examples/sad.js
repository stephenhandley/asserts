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
      Assert.equal(2, 3, "yep");
    },
    "o": {
      "rama": function() {
        Assert.equal(2, 10, "MATH");
      },
      "hnooooo": function() {
        Assert.equal(1, 1);
      }
    }
  },
  "meh": function() {
    Assert.equal(1, 2, "oh nooooo");
  }
}, function (error) {
  console.log("SAD");
});