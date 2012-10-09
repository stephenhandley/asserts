function TestResultsGroup (passed, items) {
  this.passed = passed;
  this.items = items;
  
  this.isAtom = false;
  this.isGroup = true;
};

module.exports = TestResultsGroup;