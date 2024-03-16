import queryDatabase from "../utils/queryDatabase.js";
import parseQueryParams from "../utils/parseQueryParams.js";

export default {
  get: async (req, res) => {
    res.end(JSON.stringify({ GET: "/receipt" }));
  },
  post: async (req, res) => {
    res.end(JSON.stringify({ POST: "/receipt" }));
  },
  patch: async (req, res) => {
    res.end(JSON.stringify({ PATCH: "/receipt" }));
  },
  delete: async (req, res) => {
    res.end(JSON.stringify({ DELETE: "/receipt" }));
  },
};
