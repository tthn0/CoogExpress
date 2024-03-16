import queryDatabase from "../utils/queryDatabase.js";
import parseQueryParams from "../utils/parseQueryParams.js";

export default {
  get: async (req, res) => {
    res.end(JSON.stringify({ GET: "/inventory" }));
  },
  post: async (req, res) => {
    res.end(JSON.stringify({ POST: "/inventory" }));
  },
  patch: async (req, res) => {
    res.end(JSON.stringify({ PATCH: "/inventory" }));
  },
  delete: async (req, res) => {
    res.end(JSON.stringify({ DELETE: "/inventory" }));
  },
};
