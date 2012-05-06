var assert = require('assert');
var asserts = require('../');

asserts({
  "foo": function() {
    assert.equal("something", "something", "optional message");
    assert.equal(2, 2);
  },
  "barf" : {
    "ing": function () {
      assert.equal(1, 1, "okay");
    },
    "ed": function() {
      assert.equal(2, 2, "yep");
    }
  }
});