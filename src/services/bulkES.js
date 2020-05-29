import omit from "lodash.omit";
import { cleanObject } from "../utils";

export default async ({ docs, Client }) => {
  try {
    if (!docs.length) return;

    const dataset = [];

    const body = dataset.flatMap(doc => [
      {
        index: {
          _index: "newdoc",
          _id: doc.id
        }
      },
      cleanObject(omit(doc, ["id"]))
    ]);

    const { body: bulkResponse } = await Client.bulk({
      refresh: true,
      body
    });

    if (bulkResponse.errors) {
      const erroredDocuments = [];
      // The items array has the same order of the dataset we just indexed.
      // The presence of the `error` key indicates that the operation
      // that we did for the document has failed.
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
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
  } catch (err) {
    console.log(err);
  }
};
