import elasticsearch from "@elastic/elasticsearch";
require("dotenv").config();

elasticsearch.Promise = global.Promise;

export const connect = async ({
  host = process.env.ES_DEFAULT_HOST,
  port = process.env.ES_DEFAULT_PORT
} = {}) => {
  return new elasticsearch.Client({ node: `${host}:${port}` });
};

export default elasticsearch;
