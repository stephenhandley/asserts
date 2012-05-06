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
```js
assert = require('assert');
tressa = require('tressa');

tressa({
  "<Name for group>": function() {
    assert.equal("<expected>", "<actual>", "<message>");
    assert.equal("<expected2>", "<actual2>", "<message2>");
    // ...
  },
  "<Name for other group>" : {
    "<Name for other group subgroup>": function () {
      // ...
    }
  }
});
```