function TestResult (passed, message) {
  this.passed = passed;
  this.message = message;
  
  this.isAtom = true;
  this.isGroup = false;
};

module.exports = TestResult;