'use strict';

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _toml = require('toml');

var _toml2 = _interopRequireDefault(_toml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _buildCss = require('./build-css');

var _buildCss2 = _interopRequireDefault(_buildCss);

var _buildHtml = require('./build-html');

var _buildHtml2 = _interopRequireDefault(_buildHtml);

var _buildJavascript = require('./build-javascript');

var _buildJavascript2 = _interopRequireDefault(_buildJavascript);

var _postBuild = require('./post-build');

var _postBuild2 = _interopRequireDefault(_postBuild);

var _globPages = require('./glob-pages');

var _globPages2 = _interopRequireDefault(_globPages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function customPost(program, callback) {
  var directory = program.directory;
  var customPostBuild = void 0;
  try {
    // $FlowIssue - https://github.com/facebook/flow/issues/1975
    var gatsbyNodeConfig = require(directory + '/gatsby-node');
    customPostBuild = gatsbyNodeConfig.postBuild;
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND' && !(0, _includes3.default)(e.Error, 'gatsby-node')) {
      console.log('Failed to load gatsby-node.js, skipping custom post build script', e);
    }
  }

  if (customPostBuild) {
    console.log('Performing custom post-build steps');

    return (0, _globPages2.default)(directory, function (globError, pages) {
      return customPostBuild(pages, function (error) {
        if (error) {
          console.log('customPostBuild function failed');
          callback(error);
        }
        return callback();
        // eslint-disable-next-line comma-dangle
      });
    });
  }

  return callback();
} /*  weak */


function post(program, callback) {
  console.log('Copying assets');

  (0, _postBuild2.default)(program, function (error) {
    if (error) {
      console.log('failed to copy assets');
      return callback(error);
    }

    return customPost(program, callback);
  });
}

function bundle(program, callback) {
  console.log('Compiling production bundle.js');

  (0, _buildJavascript2.default)(program, function (error) {
    if (error) {
      console.log('failed to compile bundle.js');
      return callback(error);
    }

    return post(program, callback);
  });
}

function html(program, callback) {
  var directory = program.directory;
  var config = void 0;
  try {
    config = _toml2.default.parse(_fs2.default.readFileSync(directory + '/config.toml'));
  } catch (error) {
    console.log("Couldn't load your site config");
    callback(error);
  }

  console.log('Generating CSS');
  (0, _buildCss2.default)(program, function (cssError) {
    if (cssError) {
      console.log('Failed at generating styles.css');
      return callback(cssError);
    }

    console.log('Generating Static HTML');
    return (0, _buildHtml2.default)(program, function (htmlError) {
      if (htmlError) {
        console.log('Failed at generating HTML');
        return callback(htmlError);
      }

      // If we're not generating javascript, go directly to post build steps
      if (config.noProductionJavascript) {
        return post(program, callback);
      } else {
        return bundle(program, callback);
      }
    });
  });
}

module.exports = html;