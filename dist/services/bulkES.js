"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _lodash = _interopRequireDefault(require("lodash.omit"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref) {
    var docs, Client, dataset, body, _yield$Client$bulk, bulkResponse, erroredDocuments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            docs = _ref.docs, Client = _ref.Client;
            _context.prev = 1;

            if (docs.length) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            dataset = [];
            body = dataset.flatMap(function (doc) {
              return [{
                index: {
                  _index: "newdoc",
                  _id: doc.id
                }
              }, (0, _utils.cleanObject)((0, _lodash.default)(doc, ["id"]))];
            });
            _context.next = 8;
            return Client.bulk({
              refresh: true,
              body: body
            });

          case 8:
            _yield$Client$bulk = _context.sent;
            bulkResponse = _yield$Client$bulk.body;

            if (bulkResponse.errors) {
              erroredDocuments = []; // The items array has the same order of the dataset we just indexed.
              // The presence of the `error` key indicates that the operation
              // that we did for the document has failed.

              bulkResponse.items.forEach(function (action, i) {
                var operation = Object.keys(action)[0];

                if (action[operation].error) {
                  erroredDocuments.push({
                    // If the status is 429 it means that you can retry the document,
                    // otherwise it's very likely a mapping error, and you should
                    // fix the document before to try it again.
                    status: action[operation].status,
                    error: action[operation].error,
                    operation: body[i * 2],
                    document: body[i * 2 + 1]
                  });
                }
              });
              console.log(erroredDocuments);
            }

            console.log("body %j", body);
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 14]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;