(function() {
  // adapted from https://github.com/Marak/colors.js/blob/master/colors.js
  var stylize = function(str, style_name) {
    var style = {
      'bold'      : ['\033[1m',  '\033[22m'],
      'underline' : ['\033[4m',  '\033[24m'],
      'green'     : ['\033[32m', '\033[39m'],
      'red'       : ['\033[31m', '\033[39m'],
    }[style_name];
    return style[0] + str + style[1];
  };

  var tressa = function(groups) {
    for (label in groups) {
      if (groups.hasOwnProperty(label)) {
        var group = groups[label];
        label = stylize(label, 'bold');
      
        console.log('');
        try {
          group();
          console.log(stylize(':) ' + label, 'green'));
        } catch (error) {
          console.log(stylize(':( ' + label, 'red'));
          var diff = 'Expected ' + stylize(error.expected, 'bold') + ' but got ' + stylize(error.actual, 'bold');
          console.log('   ' + stylize(error.message, 'underline') + ': ' + diff);
        }
      }
    }
    console.log("");
  }

  module.exports = tressa;
})();

