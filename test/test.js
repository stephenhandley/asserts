var Assert = require('assert');
var Async = require('async');

var Asserts = require('../lib');
var stylize = require('../lib/stylize');

try {
  Async.series([
    function (test_done) {
      console.log(stylize('testing Asserts.all.*', ['green', 'underline']));

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
      console.log(stylize('testing PASSING Asserts(<function returning object as arg>)', ['green', 'underline']));

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
      console.log(stylize('testing FAILING Asserts(<object>)', ['red', 'underline']));

      Asserts({
        blah : function () {
          // PASS
          Assert.equal(10, 10);
        },
        fail : function () {
          // FAIL
          Assert.equal(11, 10, "MESSAGE HERE WHUT");
        }
      }, test_done);
    },

    function (test_done) {
      console.log(stylize('testing PASSING Asserts(<nested object>)', ['green', 'underline']));

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
      console.log(stylize('testing PASSING basic object async', ['green', 'underline']));
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
      console.log(stylize('testing FAILING basic object async', ['red', 'underline']));
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
      console.log(stylize('testing PASSING nested object async', ['green', 'underline']));
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
      console.log(stylize('testing FAILING nested async', ['red', 'underline']));

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
      console.log(stylize("testing FAILING nested async with closure returning test object", ['red', 'underline']));
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
      console.log(stylize("testing FAILING test with repeated failures", ['red', 'underline']));

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
      console.log(stylize("testing PASSING test using Assert.throws", ['green', 'underline']));

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
      console.log(stylize("testing PASSING examples/happy.js", ['green', 'underline']));

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
      console.log(stylize("testing FAILING examples/sad.js", ['red', 'underline']));

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
      console.log(stylize("testing FAILING Asserts.dir()", ['red', 'underline']));

      Asserts.dir({
        directory : __dirname + '/dir_test',
        callback  : test_done
      });
    }

    // HOW TO TEST WHEN DONE ISN'T PROPERLY CALLED.. what is desired behavior?

  ], function (error, results) {
    console.log(stylize("----------------\nTEST TEST PASSED\n----------------", ['bold', 'green']));
  });

} catch (error) {
  console.log("Test Failed.");
  console.log("   Expected: " + error.expected);
  console.log("     Actual: " + error.actual);
  console.log(error);

  console.log(stylize("----------------\nTEST TEST FAILED\n----------------", ['bold', 'red']));

}
