'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*  weak */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _createRoutes = require('create-routes');

var _createRoutes2 = _interopRequireDefault(_createRoutes);

var _html = require('html');

var _html2 = _interopRequireDefault(_html);

var _config = require('config');

var _gatsbyHelpers = require('../isomorphic/gatsby-helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadContext = require('.gatsby-context');

var routes = void 0;
loadContext(function (pagesReq) {
  routes = (0, _createRoutes2.default)(_config.pages, pagesReq);
});

module.exports = function (locals, callback) {
  (0, _reactRouter.match)({ routes: routes, location: (0, _gatsbyHelpers.prefixLink)(locals.path) }, function (error, redirectLocation, renderProps) {
    if (error) {
      console.log(error);
      callback(error);
    } else if (renderProps) {
      var component = _react2.default.createElement(_reactRouter.RouterContext, renderProps);
      var body = void 0;

      // If we're not generating a SPA for production, eliminate React IDs.
      if (_config.config.noProductionJavascript) {
        body = (0, _server.renderToStaticMarkup)(component);
      } else {
        body = (0, _server.renderToString)(component);
      }

      var html = '<!DOCTYPE html>\n ' + (0, _server.renderToStaticMarkup)(
      // eslint-disable-next-line comma-dangle
      _react2.default.createElement(_html2.default, _extends({ body: body }, renderProps)));
      callback(null, html);
    }
  });
};