'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadFrontmatter;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _frontMatter = require('front-matter');

var _frontMatter2 = _interopRequireDefault(_frontMatter);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _htmlFrontmatter = require('html-frontmatter');

var _htmlFrontmatter2 = _interopRequireDefault(_htmlFrontmatter);

var _babylon = require('babylon');

var babylon = _interopRequireWildcard(_babylon);

var _babelTraverse = require('babel-traverse');

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadFrontmatter(pagePath) {
  var ext = _path2.default.extname(pagePath).slice(1);

  // Load data for each file type.
  // TODO use webpack-require to ensure data loaded
  // here (in node context) is consistent with what's loaded
  // in the browser.

  var data = void 0;
  if (ext.match(/^(md|rmd|mkdn?|mdwn|mdown|markdown|litcoffee)$/)) {
    var rawData = (0, _frontMatter2.default)(_fs2.default.readFileSync(pagePath, { encoding: 'utf-8' }));
    data = (0, _objectAssign2.default)({}, rawData.attributes);
  } else if (ext === 'html') {
    var html = _fs2.default.readFileSync(pagePath, { encoding: 'utf-8' });
    // $FlowIssue - https://github.com/facebook/flow/issues/1870
    data = (0, _objectAssign2.default)({}, (0, _htmlFrontmatter2.default)(html), { body: html });
  } else if (ext === 'js' || ext === 'jsx') {
    try {
      var code = _fs2.default.readFileSync(pagePath, { encoding: 'utf-8' });
      var options = {
        sourceType: 'module',
        allowImportExportEverywhere: true,
        plugins: ['jsx', 'doExpressions', 'objectRestSpread', 'decorators', 'classProperties', 'exportExtensions', 'asyncGenerators', 'functionBind', 'functionSent', 'dynamicImport', 'flow']
      };

      var ast = babylon.parse(code, options);

      data = {};
      (0, _babelTraverse2.default)(ast, {
        AssignmentExpression: function AssignmentExpression(astPath) {
          if (astPath.node.left.type === 'MemberExpression' && astPath.node.left.property.name === 'data') {
            astPath.node.right.properties.forEach(function (prop) {
              data[prop.key.name] = prop.value.value;
            });
          }
        }
      });
    } catch (e) {
      // Ignore errors — we print out parse errors for user elsewhere.
      data = {};
    }
  } else {
    data = {};
  }

  return data;
}