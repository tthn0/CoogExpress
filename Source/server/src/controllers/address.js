import queryDatabase from "../utils/queryDatabase.js";
import parseQueryParams from "../utils/parseQueryParams.js";

export default {
  get: async (req, res) => {
    res.end(JSON.stringify({ GET: "/address" }));
  },
  post: async (req, res) => {
    res.end(JSON.stringify({ POST: "/address" }));
  },
  patch: async (req, res) => {
    res.end(JSON.stringify({ PATCH: "/address" }));
  },
  delete: async (req, res) => {
    res.end(JSON.stringify({ DELETE: "/address" }));
  },
};
