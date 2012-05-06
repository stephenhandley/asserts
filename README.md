# Description

Test grouping and formatting to make working with vanilla node assert marginally easier

# Latest Version

0.2.0

# Installation
```
npm install tressa
```

or in package.json

```json
{
  ...
  "dependencies": {
    "tressa": "~0.2.0"
  }
}
```

# Usage
[examples/happy.js](https://github.com/stephenhandley/tressa/blob/master/examples/happy.js) looks like this: 

```js
var assert = require('assert');
var tressa = require('tressa');

tressa({
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


:) barf ing


:) barf ed

```

[examples/sad.js](https://github.com/stephenhandley/tressa/blob/master/examples/sad.js) looks like this: 

```js
var assert = require('assert');
var tressa = require('tressa');

tressa({
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
    }
  }
});
```

and when run looks like this:

```sh
macbook:examples stephen$ node sad.js

:) foo


:) barf ing


:( barf ed
   yep: Expected 3 but got 2
```

but with green for :) and red for :( that aren't showing up here but do in the console (i, yam lazy) 