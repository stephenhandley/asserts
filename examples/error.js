var assert = require('assert');
var asserts = require('../');

asserts({
  "foo": function() {
    assert.equal("something", "something", "optional message");
    assert.equal(2, 2);
  },
  "barf" : "string not allowed"
});