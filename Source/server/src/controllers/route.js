import queryDatabase from "../utils/queryDatabase.js";
import parseQueryParams from "../utils/parseQueryParams.js";

export default {
  get: async (req, res) => {
    res.end(JSON.stringify({ GET: "/route" }));
  },
  post: async (req, res) => {
    res.end(JSON.stringify({ POST: "/route" }));
  },
  patch: async (req, res) => {
    res.end(JSON.stringify({ PATCH: "/route" }));
  },
  delete: async (req, res) => {
    res.end(JSON.stringify({ DELETE: "/route" }));
  },
};
