"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTools = require("graphql-tools");

var _lodash = _interopRequireDefault(require("lodash.merge"));

var _news = require("./news");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _books = [{
  title: "Harry Potter and the Chamber of Secrets",
  author: "J.K. Rowling"
}, {
  title: "Jurassic Park",
  author: "Michael Crichton"
}];
var Query = "\ntype Book {\n  title: String\n  author: String\n}\n\n  type Query {\n    _empty: String\n    books: [Book]\n  }\n  type Mutation {_empty: String}\n";
var resolvers = {
  Query: {
    books: function books(_, input, ctx) {
      return _books;
    }
  }
};
var schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: [Query, _news.typeDef],
  resolvers: (0, _lodash.default)(resolvers, _news.resolver)
});

var _default = (0, _graphqlTools.mergeSchemas)({
  schemas: [schema]
});

exports.default = _default;