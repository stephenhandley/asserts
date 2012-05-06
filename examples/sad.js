var assert = require('assert');
var tressa = require('tressa');

tressa({
  "foo": function() {
    assert.equal("something", "something", "optional message");
    assert.equal(2, 2);
  },
  "barf" : {
    "ing": function () {
      assert.equal(1, 1, "okay");
    },
    "ed": function() {
      assert.equal(2, 3, "yep");
    },
    "o": {
      "rama": function() {
        assert.equal(2, 10, "MATH");
      },
      "hnooooo": function() {
        assert.equal(1, 1);
      }
    }
  },
  "meh": function() {
    assert.equal(1, 2, "oh nooooo");
  }
});