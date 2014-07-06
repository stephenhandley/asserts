# Description

Test grouping and formatting to make working with vanilla node assert marginally easier

# Latest Version

4.0.2

# Installation
```
npm install asserts --save
```

or in package.json

```json
{
  ...
  "dependencies": {
    "asserts": "4.0.2"
  }
}
```

# Usage
NOTE: Examples below work but are out of date in demonstrating current functionality (particularly async support, .dir, and .all.*) check [test/test.js](https://github.com/stephenhandley/asserts/blob/master/test/test.js) for better examples.

[examples/happy.js](https://github.com/stephenhandley/asserts/blob/master/examples/happy.js) looks like this:

```js
var Assert = require('assert');
var Asserts = require('asserts');

Asserts({
  foo : function() {
    Assert.equal("something", "something", "optional message");
    Assert.equal(2, 2);
  },
  barf : {
    ing : function () {
      Assert.equal(1, 1, "okay");
    },
    ed : function() {
      Assert.equal(2, 2, "yep");
    }
  }
});
```
and when run looks like this:

![](https://raw.github.com/stephenhandley/asserts/master/examples/happy_output.png)

[examples/sad.js](https://github.com/stephenhandley/asserts/blob/master/examples/sad.js) looks like this:

```js
var Assert = require('assert');
var Asserts = require('asserts');

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
});
```

and when run looks like this:

![](https://raw.github.com/stephenhandley/asserts/master/examples/sad_output.png)

Check test/test.js for example of Asserts.dir and Asserts.['equal', 'notEqual', 'deepEqual', 'notDeepEqual', 'strictEqual', 'notStrictEqual']

#TODO

add better documentation for 4.0.0 stuff - async support, .all., .dir

#Build status
[![build status](https://secure.travis-ci.org/stephenhandley/asserts.png)](http://travis-ci.org/stephenhandley/asserts)