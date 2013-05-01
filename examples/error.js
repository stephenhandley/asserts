var Assert = require('assert');
var Asserts = require('../lib/');

Asserts({
  "foo": function() {
    assert.equal("something", "something", "optional message");
    assert.equal(2, 2);
  },
  "barf" : "string not allowed"
}, function (error) {
  console.log("WHUT");
});