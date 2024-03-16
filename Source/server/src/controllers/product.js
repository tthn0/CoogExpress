import queryDatabase from "../utils/queryDatabase.js";
import parseQueryParams from "../utils/parseQueryParams.js";

export default {
  get: async (req, res) => {
    res.end(JSON.stringify({ GET: "/product" }));
  },
  post: async (req, res) => {
    res.end(JSON.stringify({ POST: "/product" }));
  },
  patch: async (req, res) => {
    res.end(JSON.stringify({ PATCH: "/product" }));
  },
  delete: async (req, res) => {
    res.end(JSON.stringify({ DELETE: "/product" }));
  },
};
