'use strict';

var _frontMatter = require('front-matter');

var _frontMatter2 = _interopRequireDefault(_frontMatter);

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*  weak */
var highlight = function highlight(str, lang) {
  if (lang !== null && _highlight2.default.getLanguage(lang)) {
    try {
      return _highlight2.default.highlight(lang, str).value;
    } catch (_error) {
      console.error(_error);
    }
  }
  try {
    return _highlight2.default.highlightAuto(str).value;
  } catch (_error) {
    console.error(_error);
  }
  return '';
};

var md = (0, _markdownIt2.default)({
  html: true,
  linkify: true,
  typographer: true,
  highlight: highlight
});

module.exports = function (content) {
  this.cacheable();
  var meta = (0, _frontMatter2.default)(content);
  var body = md.render(meta.body);
  var result = (0, _objectAssign2.default)({}, meta.attributes, {
    body: body
  });
  this.value = result;
  return 'module.exports = ' + JSON.stringify(result);
};