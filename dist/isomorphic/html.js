'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gatsbyHelpers = require('gatsby-helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*  weak */

var defaultMessage = '\nGatsby is currently using the default template for HTML. You can override\nthis functionality by creating a React component at "/html.js"\n\nYou can see what this default template does by visiting:\nhttps://github.com/gatsbyjs/gatsby/blob/master/lib/isomorphic/html.js\n';
console.info(defaultMessage);

function HTML(props) {
  return _react2.default.createElement(
    'html',
    { lang: 'en' },
    _react2.default.createElement(
      'head',
      null,
      _react2.default.createElement('meta', { charSet: 'utf-8' }),
      _react2.default.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
      _react2.default.createElement('meta', {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0 maximum-scale=5.0'
      })
    ),
    _react2.default.createElement(
      'body',
      null,
      _react2.default.createElement('div', { id: 'react-mount', dangerouslySetInnerHTML: { __html: props.body } }),
      _react2.default.createElement('script', { src: (0, _gatsbyHelpers.prefixLink)('/bundle.js') })
    )
  );
}

HTML.propTypes = { body: _react.PropTypes.node };

module.exports = HTML;