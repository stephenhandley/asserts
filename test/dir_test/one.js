var Assert = require('assert');

module.exports = {
  a : function () {
    Assert.equal(10, 10);
  },

  b : function (done) {
    setTimeout(function () {
      Assert.equal(3, 3);
      done();
    }, 100);
  }
}