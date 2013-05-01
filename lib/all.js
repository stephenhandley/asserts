var Assert = require('assert');
var Type  = require('type-of-is');

////// allEqual
//
//
// accepts a single Array argument of sub arrays with 4 elements each:
// [object, function, arguments, expected]
//
// runs the equivalent of
// assert.equal(<obj>.<fn>(<arguments>), <expected>)
// and returns true if all assertions succeed, false otherwise
//
// can also pass 3 element array when testing unattached function (no object)

function all(test_fn, expectations) {
  if (!Type.is(expectations, Array)) {
    throw new Error("Argument to Asserts.allEqual should be array");
  }

  expectations.forEach(function (expectation) {
    if (expectation.length == 3) {
      expectation = [null].concat(expectation);
    }
    var obj = expectation[0];
    var fn = expectation[1];
    var args = expectation[2];
    var expected = expectation[3];

    // if arguments is a single atom, wrap it as an array
    if (!Array.isArray(args)) { args = [args]; }

    test_fn(fn.apply(obj, args), expected);
  });
  return true;
};

['equal', 'notEqual', 'deepEqual', 'notDeepEqual', 'strictEqual', 'notStrictEqual'].forEach(function (fn) {
  all[fn] = function (expectations) {
    return all(Assert[fn], expectations);
  }
});


//assert.throws(block, [error], [message])
//assert.doesNotThrow(block, [error], [message])

module.exports = all;