var Domain = require('domain');
var Type   = require('type-of-is');

var _stylize = require('./stylize');

// process plain <tests> object so values become Test instances
function _processGroup (tests) {
  var group = {};

  Object.keys(tests).forEach(function (key) {
    var test = new Test(tests[key]);
    group[key] = test;
  });

  return group;
}

// create a string of spaces of length <length>
function _spaces (length) {
  var result = '';
  for (;length > 0; length--) { result += ' '; }
  return result;
}

// format <error> for display
function _messageForError (error) {
  if (Type(error, String)) {
    return error;
  }
  
  var error_message = '';

  if (error.message) {
    error_message = _stylize(error.message, 'underline') + ": ";
  }

  var message;
  if (error.expected) {
    var diff = 'Expected ' + _stylize(error.expected, 'bold') + ' but got ' + _stylize(error.actual, 'bold');
    message = error_message + diff;
  } else {
    message = error_message + error.stack;
  }

  return message;
}

// Main Test class, what gets exported

function Test (tests) {
  this.atom = null;

  this.group = null;
  this.group_index = 0;
  this.group_all_passed = true;

  this.message = null;
  this.is_async = null;
  this.callback = null;

  this.state = Test.State.ready;

  var tests_type = Type(tests);

  // if <tests> is an object, this test becomes a group, with each value itself becoming a test
  if (tests_type == Object) {
    this.group = _processGroup(tests);

  // if <tests> is a function, this is treated as a single test to run
  // it is possible for this function to return a plain object
  // in that case, the result will get treated as group to be processed and run as in previous case
  } else if (tests_type == Function) {
    this.atom = tests;

  } else {
     throw new Error("Values passed to asserts should be of type Object or Function");
  }
};

// states that a test can be in
Test.State = {
  ready   : 'ready',
  running : 'running',
  failed  : 'failed',
  passed  : 'passed'
};

Test.prototype.isGroup = function () {
  return (this.group !== null);
};

Test.prototype.isAsync = function () {
  if (this.is_async === null) {
    if (this.isGroup()) {
      // if any test within this group is asynchronous, then the group as a whole is
      this.is_async = this.group.some(function(test) {
        return test.isAsync();
      });

    } else {
      // test to see whether this function had a callback argument to determine
      // whether this test is asynchronous or not
      this.is_async = (this.atom.length === 1);
    }
  }

  return this.is_async;
};

// add some state testing functions:
// test.ready(), test.running(), test.passed(), test.failed()
Object.keys(Test.State).forEach(function (state) {
  Test.prototype[state] = function () {
    return (this.state === Test.State[state]);
  }
});

Test.prototype.runNextAtomInGroup = function () {
  var _this = this;

  // array of group's tests
  if (!this.group_tests) {
    this.group_tests = Object.keys(this.group).map(function (k) {
      return _this.group[k];
    });
  }

  var test = this.group_tests[this.group_index];

  test.run(function () {
    _this.group_index += 1;
    _this.group_all_passed = (_this.group_all_passed && test.passed());

    if (_this.group_index >= _this.group_tests.length) {
      // tests are done, group passed if all passed
      _this.state = _this.group_all_passed ? Test.State.passed : Test.State.failed;
      _this.callback();

    } else {
      // run next test
      _this.runNextAtomInGroup();
    }
  });
};

// the test runner
Test.prototype.run = function (callback) {
  this.callback = callback;
  this.state = Test.State.running;

  if (this.isGroup()) {
    // if the test is a group, run the individual tests in this.group
    this.runNextAtomInGroup();

  } else {
    // run this.atom as a single test

    var _this = this;
    // tests get run within this domain so that assertion errors within timers are properly handled
    var test_domain = Domain.create();

    test_domain.on('error', function (error) {
      _this.message = _messageForError(error);
      _this.state = Test.State.failed;
      
      if (_this.callback) {
        _this.callback(error);
      }
    });

    test_domain.run(function () {
      if (_this.isAsync()) {
        _this.atom(function () {
          // we get here if there isn't an error while running
          _this.state = Test.State.passed;
          _this.callback();
        });

      } else {

        var result = _this.atom();

        // check to see whether we got an object as a result
        // if so we run the result as a new test group
        if (result !== null) {
          if (Type(result, Object)) {
            // function returned group, change this test to a group and re-run
            _this.is_async = null;
            _this.atom = null;
            _this.group = _processGroup(result);

            _this.run(_this.callback);

          } else {
            _this.state = Test.State.passed;
            if (_this.callback) {
              _this.callback();
            }
          }
        }
      }
    });
  }
}

// color, stylize, and indent the results
Test.prototype.display = function (num_spaces) {
  if (typeof num_spaces === 'undefined') {
    num_spaces = 0;
  }

  var _this = this;

  var top_spaces = 3;
  var is_top = (num_spaces === 0);

  if (this.isGroup()) {
    var labels = Object.keys(this.group);
    var num_tests = labels.length;

    for (var i = 0; i < num_tests; i++) {
      var label = labels[i];
      var test  = _this.group[label];

      var emo, color;

      if (test.passed()) {
        emo = ':)';
        color = 'green';

      } else {
        emo = ':('
        color = 'red';
      }

      // display the label
      var label_output = (is_top ? (emo + ' ') : '') + label;
      console.log(_spaces(num_spaces) + _stylize(label_output, ['bold', color]));

      // display the test result
      var new_num_spaces = (is_top ? top_spaces : num_spaces) + 1;
      test.display(new_num_spaces);

      if ((i == (num_tests - 1)) && !test.isGroup()) {
        console.log();
      }
    }

  } else {
    if (this.failed()) {
      // display error message
      num_spaces = (is_top ? top_spaces : num_spaces) + 1;
      console.log(_spaces(num_spaces) + _stylize(this.message, 'red'));      
    }
  }
}

module.exports = Test;