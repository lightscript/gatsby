"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _react2.default.createClass({
  displayName: "exports",

  propTypes: {
    route: _react.PropTypes.shape({
      page: _react.PropTypes.shape({
        data: _react.PropTypes.object
      })
    })
  },

  render: function render() {
    var post = this.props.route.page.data;
    return _react2.default.createElement(
      "div",
      { className: "markdown" },
      _react2.default.createElement(
        "h1",
        null,
        post.title
      ),
      _react2.default.createElement("div", { dangerouslySetInnerHTML: { __html: post.body } })
    );
  }
}); /*  weak */