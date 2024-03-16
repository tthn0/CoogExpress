import queryDatabase from "../utils/queryDatabase.js";
import parseQueryParams from "../utils/parseQueryParams.js";

export default {
  get: async (req, res) => {
    res.end(JSON.stringify({ GET: "/shipment" }));
  },
  post: async (req, res) => {
    res.end(JSON.stringify({ POST: "/shipment" }));
  },
  patch: async (req, res) => {
    res.end(JSON.stringify({ PATCH: "/shipment" }));
  },
  delete: async (req, res) => {
    res.end(JSON.stringify({ DELETE: "/shipment" }));
  },
};
