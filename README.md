# Description

Test grouping and formatting to make working with vanilla node assert marginally easier

# Latest Version

0.4.0

# Installation
```
npm install asserts
```

or in package.json

```json
{
  ...
  "dependencies": {
    "asserts": "~0.4.0"
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

```sh
$ node sad.js 

:) foo

:( barf
    ing
    ed
     yep: Expected 3 but got 2
    o
     rama
      MATH: Expected 10 but got 2
     hnooooo

:( meh
    oh nooooo: Expected 2 but got 1
    
```

but with green for :) and red for :( that aren't showing up here but do in the console (i, yam lazy) 