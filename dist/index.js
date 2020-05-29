"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _apolloServerExpress = require("apollo-server-express");

var _graphql = _interopRequireDefault(require("./graphql"));

var _elasticsearch = require("./external-libs/elasticsearch");

var _winston = _interopRequireDefault(require("./external-libs/winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("dotenv").config();

var port = parseInt(process.env.PORT, 10) || 9007;
var playground = process.env.APOLLO_PLAYGROUND === "true" && true || false;
var introspection = process.env.APOLLO_INTROSPECTION === "true" && true || false;
var debug = process.env.APOLLO_DEBUG === "true" && true || false;
var apollo_path = process.env.APOLLO_PATH || "/graphql";
var whitelist = process.env.SERVER_REQUEST_WHITE_LIST;
var corsEnabled = process.env.SERVER_CORS_ENABLED;

function init() {
  return _init.apply(this, arguments);
}

function _init() {
  _init = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var Client, app, router, logger, corsOptions, loggingMiddleware, server;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _elasticsearch.connect)();

          case 2:
            Client = _context.sent;
            app = (0, _express.default)();
            router = _express.default.Router();
            logger = new _winston.default("apollo", false); // parse application/json

            app.use(_bodyParser.default.urlencoded({
              extended: false,
              limit: "50mb"
            }));
            app.use(_bodyParser.default.json());
            corsOptions = {
              origin: function origin(_origin, callback) {
                if (!_origin || whitelist.indexOf(_origin) !== -1) {
                  callback(null, true);
                } else {
                  callback(new Error("Not allowed access!"));
                }
              }
            };

            loggingMiddleware = function loggingMiddleware(req, res, next) {
              if (req.body.operationName && !["IntrospectionQuery"].includes(req.body.operationName)) {
                var getIP = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || "").split(",")[0] || req.client.remoteAddress;
                var ip = getIP.length < 15 && getIP || getIP.slice(7) || req.ip;

                var _req$body = req.body,
                    query = _req$body.query,
                    body = _objectWithoutProperties(_req$body, ["query"]);

                logger.info("[GraphQL.request] ".concat(ip), body);
              }

              next();
            };

            if (corsEnabled !== "true") {
              corsOptions = {};
            }

            router.get("/", function (req, res) {
              res.sendFile(_path.default.join(process.cwd() + "/app/build/index.html")); //__dirname : It will resolve to your project folder.
            });
            app.use((0, _cors.default)(corsOptions));
            app.use(loggingMiddleware); // error handler

            app.use(function (err, req, res, next) {
              // render the error page
              // logger.error(err.message);
              res.status(err.status || 500);
              res.json({
                message: "Not allowed access!"
              });
            });
            app.use(_express.default.static(process.cwd() + "/app/build"));
            app.use(_express.default.static(process.cwd() + "/static"));
            app.use("/", router); // Append apollo to our API

            server = new _apolloServerExpress.ApolloServer({
              schema: _graphql.default,
              context: {
                Client: Client
              },
              introspection: introspection,
              playground: playground,
              debug: debug,
              formatError: function formatError(error) {
                // filter whatever errors your don't want to log
                logger.error("[GraphQL.error]", error);
                return {
                  message: error.message,
                  errorCode: error.extensions && error.extensions.code || null
                };
              } // formatResponse: response => {
              //   // don't log auth mutations or schema requests
              //   const name = Object.keys(get(response, "data") || { unknown: 0 })[0];
              //   if (!["__schema"].includes(name)) {
              //     logger.info(`[GraphQL.response] ${name}`, response);
              //   }
              //   return response;
              // }

            });
            server.applyMiddleware({
              app: app,
              path: apollo_path,
              cors: false
            });
            app.listen(port, function () {
              logger.info("\uD83D\uDE80 Client ready at http://localhost:".concat(port, "/"));
              logger.info("\uD83D\uDE80 Server ready at http://localhost:".concat(port).concat(server.graphqlPath));
              logger.info("Try your health check at: http://localhost:".concat(port).concat(server.graphqlPath, "/.well-known/apollo/server-health"));
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _init.apply(this, arguments);
}

init();