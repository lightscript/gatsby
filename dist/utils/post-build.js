'use strict';

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _parseFilepath = require('parse-filepath');

var _parseFilepath2 = _interopRequireDefault(_parseFilepath);

var _globPages = require('./glob-pages');

var _globPages2 = _interopRequireDefault(_globPages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*  weak */
var debug = require('debug')('gatsby:post-build');

module.exports = function (program, cb) {
  var directory = program.directory;

  return (0, _globPages2.default)(directory, function (err, pages) {
    debug('copying files');
    // Async callback to copy each file.
    var copy = function copyFile(file, callback) {
      // Map file to path generated for that directory.
      // e.g. if file is in directory 2015-06-16-my-sweet-blog-post that got
      // rewritten to my-sweet-blog-post, we find that path rewrite so
      // our asset gets copied to the right directory.
      var parsed = (0, _parseFilepath2.default)(file);
      var relativePath = _path2.default.relative(directory + '/pages', file);
      var oldDirectory = (0, _parseFilepath2.default)(relativePath).dirname;
      var newPath = '';

      // Wouldn't rewrite basePath
      if (oldDirectory === '') {
        oldDirectory = '/';
        newPath = '/' + parsed.basename;
      }

      if (!(oldDirectory === '/')) {
        var page = (0, _find3.default)(pages, function (p) {
          // Ignore files that start with underscore (they're not pages).
          if (p.file.name.slice(0, 1) !== '_') {
            return (0, _parseFilepath2.default)(p.requirePath).dirname === oldDirectory;
          } else {
            return false;
          }
        });

        if (page) {
          newPath = _path2.default.join((0, _parseFilepath2.default)(page.path).path, parsed.basename);
        } else {
          // We couldn't find a page associated with this file. Probably
          // the file is in a directory of static files. In any case,
          // we'll leave the file directory alone.
          newPath = relativePath;
        }
      }

      newPath = directory + '/public/' + newPath;
      return _fsExtra2.default.copy(file, newPath, function (error) {
        return callback(error);
      });
    };

    // Copy static assets to public folder.
    var assetTypes = '*.jpg|*.jpeg|*.png|*.pdf|*.gif|*.ico|*.svg|*.pdf|*.txt|CNAME';
    var globString = directory + '/pages/**/?(' + assetTypes + ')';
    return (0, _glob2.default)(globString, { follow: true }, function (e, files) {
      return _async2.default.map(files, copy, function (error, results) {
        return (
          // eslint-disable-next-line comma-dangle
          cb(error, results)
        );
      }
      // eslint-disable-next-line comma-dangle
      );
    });
  });
};