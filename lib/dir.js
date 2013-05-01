var FS   = require('fs');
var Path = require('path');
var _stylize = require('./stylize');

var Asserts = require('./index');

function dir (options) {
  var parent_filename = module.parent.parent.filename;

  var defaults = {
    only: null,
    exclude: null,
    directory: Path.dirname(parent_filename),
    main: Path.basename(parent_filename),
    callback: function () {}
  }
  if (arguments.length > 0) {
    Object.keys(options).forEach(function(k) {
      defaults[k] = options[k];
    });
  }
  options = defaults;

  tests = {};
  FS.readdirSync(options.directory).forEach(function (filename) {
    var filepath = Path.join(options.directory, filename)

    if (options.only) {
      if (options.only.indexOf(filename) == -1) {
        return;
      }

    } else {
      var ext = Path.extname(filename);
      var is_requirable = (['.js', '.coffee'].indexOf(ext) != -1);

      var is_file = FS.statSync(filepath).isFile();

      var is_excluded = (options.exclude && options.exclude.indexOf(filename) != -1);
      if (is_excluded || (is_file && (!is_requirable || (filename === options.main)))) {
        return;
      }
    }

    var test_name = Path.basename(filename, '.js');
    test_name = Path.basename(filename, '.coffee');
    tests[test_name] = require(filepath);
  });

  Asserts(tests, options.callback);
}

module.exports = dir;