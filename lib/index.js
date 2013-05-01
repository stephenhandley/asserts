var Test = require('./Test');

function Asserts (tests, callback) {
  var test = new Test(tests);
  var cb;

  if (typeof callback === 'undefined') {
    cb = function () {
      test.display();
    };

  } else {
    cb = function () {
      test.display();
      callback();
    }
  }

  test.run(cb);
}

module.exports = Asserts;
module.exports.all = require('./all');
module.exports.dir = require('./dir');