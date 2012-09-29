var Type = require('./type');

function display (results, level) {
  var label, emo, color, output;
  var emo_indent = 3;
  var level0 = (level === 0);
      
  for (label in results) {
    result = results[label];
    
    if (result.passed) {
      emo = ':)';
      color = 'green';
    
    } else {   
      emo = ':('
      color = 'red';
    }
    
    output = (level0 ? (emo + ' ') : '') + label;
    console.log(indent(level) + stylize(output, ['bold', color]));
    
    if (result.type === Type.RESULT_TYPE.ATOM) {
      if (!result.passed) {
        var indent_level = level0 ? (emo_indent + 1) : (level + 1);
        console.log(indent(indent_level) + stylize(result.message, 'red'));
      }
    
    } else {
      var new_level = (level0 ? emo_indent : level) + 1;
      display(result.items, new_level);
    }
    
  }
  if (level0) { console.log(); }
}

// adapted from https://github.com/Marak/colors.js/blob/master/colors.js
function stylize (str, styles) {
  var styles_map = {
    'bold'      : ['\033[1m',  '\033[22m'],
    'underline' : ['\033[4m',  '\033[24m'],
    'green'     : ['\033[32m', '\033[39m'],
    'red'       : ['\033[31m', '\033[39m'],
  };
  
  if (!Type.isArray(styles)) { styles = [styles]; }
  
  styles.forEach(function(style) {
    style = styles_map[style];
    str = style[0] + str + style[1];
  });
  
  return str;
}

function indent (length) {
  var result = '';
  for (;length > 0; length--) { result += ' '; }
  return result;
}

module.exports = display;
module.exports.stylize = stylize;