# Description

Test grouping and formatting to make working with vanilla node assert marginally easier

# Latest Version

2.0.0

# Installation
```
npm install asserts
```

or in package.json

```json
{
  ...
  "dependencies": {
    "asserts": "~2.0.0"
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

```sh

$ node happy.js

:) foo

:) barf
    ing
    ed

```

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

<div>
  <span style="color:green;">:) foo</span>
  <br />
  <br />
  <span style="color:red;">:( barf</span>
  <br />
  <span style="color:green;">&nbsp;&nbsp;&nbsp;&nbsp;ing</span>
  <br />
  <span style="color:red;">&nbsp;&nbsp;&nbsp;&nbsp;ed</span>
  <br />
  <span style="color:red;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="text-decoration:underline">yep</span>: Expected 3 but got 2</span>
  <br />  
  <span style="color:red;">&nbsp;&nbsp;&nbsp;&nbsp;o</span>
  <br />  
  <span style="color:red;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rama</span>
  <br />
  <span style="color:red;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="text-decoration:underline">MATH</span>: Expected 10 but got 2</span>
  <span style="color:green;">&nbsp;&nbsp;&nbsp;&nbsp;hnooooo</span>
  <br/>
  <br/>
  <span style="color:red;">:( meh</span>
  <br />
  <span style="color:green;">&nbsp;&nbsp;&nbsp;&nbsp;<span style="text-decoration:underline">oh nooooo</span>: Expected 2 but got 1</span>
</div>

Check test/test.js for example of Asserts.allEqual (TODO: add here)

#Build status
[![build status](https://secure.travis-ci.org/stephenhandley/asserts.png)](http://travis-ci.org/stephenhandley/asserts)