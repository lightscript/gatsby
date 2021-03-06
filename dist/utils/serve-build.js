'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _opn = require('opn');

var _opn2 = _interopRequireDefault(_opn);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _startWithDynamicPort = require('./startWithDynamicPort');

var _startWithDynamicPort2 = _interopRequireDefault(_startWithDynamicPort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*  weak */
var debug = require('debug')('gatsby:application');

function startServer(program, launchPort) {
  var directory = program.directory;
  var serverPort = launchPort || program.port;

  debug('Serving /public');
  var server = new _hapi2.default.Server();

  server.connection({
    host: program.host,
    port: serverPort
  });

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: directory + '/public',
        listing: false,
        index: true
      }
    }
  });

  server.start(function (e) {
    if (e) {
      if (e.code === 'EADDRINUSE') {
        // eslint-disable-next-line max-len
        console.log(_chalk2.default.red('Unable to start Gatsby on port ' + serverPort + ' as there\'s already a process listing on that port.'));
      } else {
        console.log(_chalk2.default.red(e));
      }

      process.exit();
    } else {
      if (program.open) {
        (0, _opn2.default)(server.info.uri);
      }
      console.log(_chalk2.default.green('Server started successfully!'));
      console.log();
      console.log('Listening at:');
      console.log();
      console.log('  ', _chalk2.default.cyan(server.info.uri));
    }
  });
}

module.exports = (0, _startWithDynamicPort2.default)(startServer);