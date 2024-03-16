import queryDatabase from "../utils/queryDatabase.js";
import parseQueryParams from "../utils/parseQueryParams.js";

export default {
  get: async (req, res) => {
    res.end(JSON.stringify({ GET: "/employee" }));
  },
  post: async (req, res) => {
    res.end(JSON.stringify({ POST: "/employee" }));
  },
  patch: async (req, res) => {
    res.end(JSON.stringify({ PATCH: "/employee" }));
  },
  delete: async (req, res) => {
    res.end(JSON.stringify({ DELETE: "/employee" }));
  },
};
