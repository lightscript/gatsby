'use strict';

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _webpack3 = require('./webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (program, callback) {
  var directory = program.directory;


  var compilerConfig = (0, _webpack4.default)(program, directory, 'build-css');

  return (0, _webpack2.default)(compilerConfig.resolve()).run(function (err, stats) {
    // We don't want any javascript produced by this step in the process.
    _fs2.default.unlinkSync(directory + '/public/bundle-for-css.js');

    return callback(err, stats);
  });
}; /*  weak */