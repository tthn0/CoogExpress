import queryDatabase from "../utils/queryDatabase.js";
import parseQueryParams from "../utils/parseQueryParams.js";

export default {
  get: async (req, res) => {
    res.end(JSON.stringify({ GET: "/branch" }));
  },
  post: async (req, res) => {
    res.end(JSON.stringify({ POST: "/branch" }));
  },
  patch: async (req, res) => {
    res.end(JSON.stringify({ PATCH: "/branch" }));
  },
  delete: async (req, res) => {
    res.end(JSON.stringify({ DELETE: "/branch" }));
  },
};
