'use strict';

var _htmlFrontmatter = require('html-frontmatter');

var _htmlFrontmatter2 = _interopRequireDefault(_htmlFrontmatter);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*  weak */
module.exports = function (content) {
  this.cacheable();
  var data = (0, _objectAssign2.default)({}, (0, _htmlFrontmatter2.default)(content), { body: content });
  this.value = data;
  return 'module.exports = ' + JSON.stringify(data);
};