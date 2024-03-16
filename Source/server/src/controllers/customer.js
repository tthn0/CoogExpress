import queryDatabase from "../utils/queryDatabase.js";
import parseQueryParams from "../utils/parseQueryParams.js";

export default {
  get: async (req, res) => {
    res.end(JSON.stringify({ GET: "/customer" }));
  },
  post: async (req, res) => {
    res.end(JSON.stringify({ POST: "/customer" }));
  },
  patch: async (req, res) => {
    res.end(JSON.stringify({ PATCH: "/customer" }));
  },
  delete: async (req, res) => {
    res.end(JSON.stringify({ DELETE: "/customer" }));
  },
};
