import queryDatabase from "../utils/queryDatabase.js";
import parseQueryParams from "../utils/parseQueryParams.js";

export default {
  get: async (req, res) => {
    res.end(JSON.stringify({ GET: "/package" }));
  },
  post: async (req, res) => {
    res.end(JSON.stringify({ POST: "/package" }));
  },
  patch: async (req, res) => {
    res.end(JSON.stringify({ PATCH: "/package" }));
  },
  delete: async (req, res) => {
    res.end(JSON.stringify({ DELETE: "/package" }));
  },
};
