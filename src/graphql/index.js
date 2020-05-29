import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import merge from "lodash.merge";
import { typeDef as News, resolver as NewsResolver } from "./news";

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const Query = `
type Book {
  title: String
  author: String
}

  type Query {
    _empty: String
    books: [Book]
  }
  type Mutation {_empty: String}
`;

const resolvers = {
  Query: {
    books: (_, input, ctx) => books
  }
};

const schema = makeExecutableSchema({
  typeDefs: [Query, News],
  resolvers: merge(resolvers, NewsResolver)
});

export default mergeSchemas({
  schemas: [schema]
});
