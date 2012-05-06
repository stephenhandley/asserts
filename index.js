(function() {
  // adapted from https://github.com/Marak/colors.js/blob/master/colors.js
  var styles = {
    'bold'      : ['\033[1m',  '\033[22m'],
    'underline' : ['\033[4m',  '\033[24m'],
    'green'     : ['\033[32m', '\033[39m'],
    'red'       : ['\033[31m', '\033[39m'],
  };
  
  var stylize = function(str, style_name) {
    var style = styles[style_name];
    return style[0] + str + style[1];
  };
  
  var type       = function(obj) { return {}.toString.call(obj); }
  var isFunction = function(obj) { return (type(obj) === '[object Function]'); };
  var isObject   = function(obj) { return (type(obj) === '[object Object]'); };
  
  var processGroups = function(groups, stack) {
    for (label in groups) {
      if (groups.hasOwnProperty(label)) {
        var group = groups[label];
        
        if (isFunction(group)) {
          // if its a function run it as a group
          label = stack.join(' ') + ' ' + label;
          runGroup(label, group);
        
        } else if (isObject(group)) {
          // if its an object, recurse to handle subgroups
          stack.push(label);
          processGroups(group, stack);
          stack.pop();
        
        } else {
          // if its anything else, throw an error
          label = stack.join(' ') + ' ' + label;
          var group_type = type(group).slice(1, -1).split(' ').pop()
          throw new Error("Group value must be Object or Function but type for \"" + label + "\" is " + group_type);
        }
      }
    }
  };
  
  var runGroup = function(label, group) {
    console.log('');
    label = stylize(label, 'bold');
    
    try {
      // run the group
      group(); 
      // asserts passed, green happy
      console.log(stylize(':) ' + label, 'green')); 
      
    } catch (error) {
      // an assert failed, red sad
      console.log(stylize(':( ' + label, 'red'));
      var diff = 'Expected ' + stylize(error.expected, 'bold') + ' but got ' + stylize(error.actual, 'bold');
      var message = '';
      if (error.message) { message = stylize(error.message, 'underline') + ": "; }
      console.log('   ' + message + diff);
    }
    
    console.log('');
  };
    
  var tressa = function(groups) {
    processGroups(groups, []);
  };

  module.exports = tressa;
})();

