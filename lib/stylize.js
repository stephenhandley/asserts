var Type  = require('type-of-is');

// adapted from https://github.com/Marak/colors.js/blob/master/colors.js
function stylize (str, styles) {
  var styles_map = {
    'bold'      : ['\033[1m',  '\033[22m'],
    'underline' : ['\033[4m',  '\033[24m'],
    'green'     : ['\033[32m', '\033[39m'],
    'red'       : ['\033[31m', '\033[39m'],
  };

  if (!Type.is(styles, Array)) {
    styles = [styles];
  }

  styles.forEach(function(style) {
    style = styles_map[style];
    str = style[0] + str + style[1];
  });

  return str;
}


module.exports = stylize;