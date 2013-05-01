var Assert = require('assert');

var Asserts = require('../lib');
var stylize = require('../lib/stylize');

var tests = [
  function (test_done) {
    console.log(stylize('testing Asserts.all.*', ['bold', 'green', 'underline']));

    try {
      var str = "hihi";
      var indexOf = str.indexOf;
      var test4 = Asserts.all.equal([
        [str, indexOf, "h", 0],
        [str, indexOf, "hi", 0],
        [str, indexOf, "i", 1],
        [str, indexOf, "b", -1]
      ]);

      function addThree (x, y, z) {
        return x + y + z;
      }

      Assert.throws(function () {
        Asserts.all.equal([
          [addThree, [1, 2, 3], 1101010],
          [addThree, [10, 10, 10], 1231230]
        ]);
      });

      function plus2 (x) { return x + 2; };

      var test3 = Asserts.all(Assert.equal, [
        [plus2, 2, 4],
        [plus2, 5, 7],
        [plus2, 111111, 111113]
      ]);

      Assert.equal(test3, true);

      console.log(stylize("PASS!", ['green', 'bold']));

    } catch (err) {
      console.log(stylize("FAIL!", ['red', 'bold']));
    }
    console.log();
    test_done();
  },

  function (test_done) {
    console.log(stylize('testing PASSING Asserts(<function returning object as arg>)', ['bold', 'green', 'underline']));

    Asserts(function () {
      var blah = "blah";

      return {
        ack : function () {
          // PASS
          Assert.equal(blah, "blah");
        },
        smack : function () {
          // PASS
          Assert.equal("hi", "hi");
        }
      };
    }, test_done);
  },

  function (test_done) {
    console.log(stylize('testing FAILING Asserts(<object>)', ['bold', 'red', 'underline']));

    Asserts({
      blah : function () {
        // PASS
        Assert.equal(10, 10);
      },
      fail : function () {
        // FAIL
        Assert.equal(11, 10);
      }
    }, test_done);
  },

  function (test_done) {
    console.log(stylize('testing PASSING Asserts(<nested object>)', ['bold', 'green', 'underline']));

    Asserts({
      one : {
        two : {
          three : {
            four : function () {
              // PASS
              Assert.equal(1, 1);
            }
          }
        }
      }
    }, test_done);
  },

  function (test_done) {
    console.log(stylize('testing PASSING basic object async', ['bold', 'green', 'underline']));
    Asserts({
      async_one: function (done) {
        setTimeout(function () {
          Assert.equal(1, 1);
          done();
        }, 50);
      },
      async_two: function (done) {
        setTimeout(function () {
          Assert.equal(2, 2);
          done();
        }, 50);
      }
    }, test_done);
  },

  function (test_done) {
    console.log(stylize('testing FAILING basic object async', ['bold', 'red', 'underline']));
    Asserts({
      async_one: function (done) {
        setTimeout(function () {
          Assert.equal(1, 2);
          done();
        }, 50);
      },
      async_two: function (done) {
        setTimeout(function () {
          Assert.equal(2, 1);
          done();
        }, 50);
      }
    }, test_done);
  },

  function (test_done) {
    console.log(stylize('testing PASSING nested object async', ['bold', 'green', 'underline']));
    Asserts({
      something : {
        yes : function (done) {
          // PASS
          Assert.equal(1, 1);
          done();
        },
        no : function (done) {
          setTimeout(function () {
            // PASS
            Assert.equal("hi", "hi");
            done();
          }, 50);
        }
      }
    }, test_done);
  },

  function (test_done) {
    console.log(stylize('testing FAILING nested async', ['bold', 'red', 'underline']));

    Asserts({
      something : {
        thispasses : function (done) {
          // PASS
          setTimeout(function () {
            Assert.equal(1, 1);
            done();
          }, 50);
        },
        thisfails : function (done) {
          // FAIL
          setTimeout(function () {
            Assert.equal(1, 0);
            done();
          }, 50);
        }
      },

      other : {
        thisfails : function (done) {
          // FAIL
          setTimeout(function () {
            Assert.equal(1, 0);
            done();
          }, 50);
        }
      }
    }, test_done);
  },

  function (test_done) {
    console.log(stylize("testing FAILING nested async with closure returning test object", ['bold', 'red', 'underline']));
    Asserts(function () {
      return {
        asynnnnnnc: function (done) {
          setTimeout(function () {
            // PASS
            Assert.equal(1, 1);
            done();
          }, 50);
        },
        metooooo : {
          good : function () {
            return {
              a: function (done) {
                setTimeout(function () {
                  // PASS
                  Assert.equal(2, 2);
                  done();
                }, 50);
              },
              b: function (done) {
                setTimeout(function () {
                  // PASS
                  Assert.equal(3, 3);
                  done();
                }, 50);
              }
            };
          },
          bad : function (done) {
            setTimeout(function () {
              // FAIL
              Assert.equal(1, 2);
              done();
            }, 50);
          }
        }
      }
    }, test_done);
  },

  // previously had issue with 0.10.4 where second error was not being properly handled within domain
  function (test_done) {
    console.log(stylize("testing FAILING test with repeated failures", ['bold', 'red', 'underline']));

    Asserts({
      one: function () {
        Assert.equal(1, 2);
      },
      two: function () {
        Assert.equal(10, 20);
      },
      three: function () {
        Assert.equal(1000,2000);
      }
    }, test_done);
  },

  // test throws
  function (test_done) {
    console.log(stylize("testing PASSING test using Assert.throws", ['bold', 'green', 'underline']));

    Asserts({
      test_throws: function () {
        Assert.throws(function() {
          throw new Error("EEEK");
        })
      }
    }, test_done)
  },

  // happy example
  function (test_done) {
    console.log(stylize("testing PASSING examples/happy.js", ['bold', 'green', 'underline']));

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
    }, test_done);
  },

  // sad example
  function (test_done) {
    console.log(stylize("testing FAILING examples/sad.js", ['bold', 'red', 'underline']));

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
    }, test_done);
  },

  function (test_done) {
    console.log(stylize("testing FAILING Asserts.dir()", ['bold', 'red', 'underline']));

    Asserts.dir({
      directory : __dirname + '/dir_test',
      callback  : test_done
    });
  }
];

var index = 0

var runNextTest = function () {
  var test = tests[index];

  test(function () {
    index += 1;

    if (index >= tests.length) {
      console.log(stylize("----------------\nTEST TEST PASSED\n----------------", ['bold', 'green']));

    } else {
      // run next test
      runNextTest();
    }
  });
};
runNextTest();

