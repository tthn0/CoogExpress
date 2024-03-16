import queryDatabase from "../utils/queryDatabase.js";
import parseQueryParams from "../utils/parseQueryParams.js";

export default {
  get: async (req, res) => {
    res.end(JSON.stringify({ GET: "/tracking_history" }));
  },
  post: async (req, res) => {
    res.end(JSON.stringify({ POST: "/tracking_history" }));
  },
  patch: async (req, res) => {
    res.end(JSON.stringify({ PATCH: "/tracking_history" }));
  },
  delete: async (req, res) => {
    res.end(JSON.stringify({ DELETE: "/tracking_history" }));
  },
};
