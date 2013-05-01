var Assert = require('assert');

module.exports = {
  c : function () {
    Assert.equal(1, 1);
  },

  d : function (done) {
    setTimeout(function () {
      Assert.equal(2, 2);
      done();
    }, 100);
  }
}