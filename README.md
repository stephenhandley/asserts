# Description

Test grouping and formatting to make working with vanilla node assert marginally easier

# Latest Version

3.1.0

# Installation
```
npm install asserts
```

or in package.json

```json
{
  ...
  "dependencies": {
    "asserts": "3.1.0"
  }
}
```

# Usage
[examples/happy.js](https://github.com/stephenhandley/asserts/blob/master/examples/happy.js) looks like this: 

```js
var assert = require('assert');
var asserts = require('asserts');

asserts({
  "foo": function() {
    assert.equal("something", "something", "optional message");
    assert.equal(2, 2);
  },
  "barf" : {
    "ing": function () {
      assert.equal(1, 1, "okay");
    },
    "ed": function() {
      assert.equal(2, 2, "yep");
    }
  }
});
```
and when run looks like this:

![](https://raw.github.com/stephenhandley/asserts/master/examples/happy_output.png)

[examples/sad.js](https://github.com/stephenhandley/asserts/blob/master/examples/sad.js) looks like this: 

```js
var assert = require('assert');
var asserts = require('asserts');

asserts({
  "foo": function() {
    assert.equal("something", "something", "optional message");
    assert.equal(2, 2);
  },
  "barf" : {
    "ing": function () {
      assert.equal(1, 1, "okay");
    },
    "ed": function() {
      assert.equal(2, 3, "yep");
    },
    "o": {
      "rama": function() {
        assert.equal(2, 10, "MATH");
      },
      "hnooooo": function() {
        assert.equal(1, 1);
      }
    }
  },
  "meh": function() {
    assert.equal(1, 2, "oh nooooo");
  }
});
```

and when run looks like this:

![](https://raw.github.com/stephenhandley/asserts/master/examples/sad_output.png)

Check test/test.js for example of Asserts.allEqual and Asserts.dir (TODO: add here)

#Build status
[![build status](https://secure.travis-ci.org/stephenhandley/asserts.png)](http://travis-ci.org/stephenhandley/asserts)