"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _winston = require("winston");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

require("dotenv").config();

var LoggerService = /*#__PURE__*/function () {
  function LoggerService(route, storage) {
    var _this = this;

    _classCallCheck(this, LoggerService);

    this.log_data = null;
    this.route = route || process.env.LOGGER_ROUTE_NAME;
    this.storage = typeof storage !== "undefined" && storage || process.env.LOGGER_ROUTE_STORAGE;
    var viewer = [new _winston.transports.Console()];

    if (this.storage === "true") {
      viewer.push(new _winston.transports.File({
        filename: "./logs/".concat(route, ".log")
      }));
    }

    var logger = (0, _winston.createLogger)({
      exitOnError: false,
      // do not exit on handled exceptions
      transports: viewer,
      format: _winston.format.combine(_winston.format.timestamp({
        format: "YYYYMMDD-HH:mm:ss:SSS"
      }), _winston.format.errors({
        stack: true
      }), _winston.format.splat(), _winston.format.json(), _winston.format.printf(function (info) {
        var message = "[".concat(info.timestamp, "] | ").concat(route, ".log | ").concat(info.level, " | ").concat(info.message);
        message = info.obj ? message + " | data:".concat(JSON.stringify(info.obj)) : message;
        message = _this.log_data ? message + " | log_data:".concat(JSON.stringify(_this.log_data)) : message;
        return message;
      }))
    });
    this.logger = logger;
  }

  _createClass(LoggerService, [{
    key: "setLogData",
    value: function setLogData(log_data) {
      this.log_data = log_data;
    }
  }, {
    key: "info",
    value: function () {
      var _info = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(message) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.logger.log("info", message);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function info(_x) {
        return _info.apply(this, arguments);
      }

      return info;
    }()
  }, {
    key: "info",
    value: function () {
      var _info2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(message, obj) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.logger.log("info", message, {
                  obj: obj
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function info(_x2, _x3) {
        return _info2.apply(this, arguments);
      }

      return info;
    }()
  }, {
    key: "debug",
    value: function () {
      var _debug = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(message) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.logger.log("debug", message);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function debug(_x4) {
        return _debug.apply(this, arguments);
      }

      return debug;
    }()
  }, {
    key: "debug",
    value: function () {
      var _debug2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(message, obj) {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.logger.log("debug", message, {
                  obj: obj
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function debug(_x5, _x6) {
        return _debug2.apply(this, arguments);
      }

      return debug;
    }() // async error(message) {
    //   this.logger.log("error", message);
    // }
    // async error(message, obj) {
    //   this.logger.log("error", message, {
    //     obj
    //   });
    // }

  }, {
    key: "warn",
    value: function () {
      var _warn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(message) {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.logger.log("warn", message);

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function warn(_x7) {
        return _warn.apply(this, arguments);
      }

      return warn;
    }()
  }, {
    key: "warn",
    value: function () {
      var _warn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(message, obj) {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.logger.log("warn", message, {
                  obj: obj
                });

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function warn(_x8, _x9) {
        return _warn2.apply(this, arguments);
      }

      return warn;
    }()
  }, {
    key: "error",
    value: function () {
      var _error2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(_error, additionalData) {
        var message;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                message = _error; // Error-like

                if (_error && _error.message && _error.stack) {
                  message = [_error.message, "---", JSON.stringify(_error.stack)].join("\n");
                }

                if (typeof message !== "string") {
                  message = JSON.stringify(_error);
                }

                if (additionalData) {
                  message = [message, "---", JSON.stringify(additionalData)].join("\n");
                }

                return _context7.abrupt("return", this.logger.error(["###", message, "###"].join("\n")));

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function error(_x10, _x11) {
        return _error2.apply(this, arguments);
      }

      return error;
    }()
  }]);

  return LoggerService;
}();

module.exports = LoggerService;