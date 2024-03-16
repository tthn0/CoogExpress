import queryDatabase from "../utils/queryDatabase.js";
import parseQueryParams from "../utils/parseQueryParams.js";

export default {
  get: async (req, res) => {
    res.end(JSON.stringify({ GET: "/billing" }));
  },
  post: async (req, res) => {
    res.end(JSON.stringify({ POST: "/billing" }));
  },
  patch: async (req, res) => {
    res.end(JSON.stringify({ PATCH: "/billing" }));
  },
  delete: async (req, res) => {
    res.end(JSON.stringify({ DELETE: "/billing" }));
  },
};
