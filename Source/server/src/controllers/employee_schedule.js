import queryDatabase from "../utils/queryDatabase.js";
import parseQueryParams from "../utils/parseQueryParams.js";

export default {
  get: async (req, res) => {
    res.end(JSON.stringify({ GET: "/employee_schedule" }));
  },
  post: async (req, res) => {
    res.end(JSON.stringify({ POST: "/employee_schedule" }));
  },
  patch: async (req, res) => {
    res.end(JSON.stringify({ PATCH: "/employee_schedule" }));
  },
  delete: async (req, res) => {
    res.end(JSON.stringify({ DELETE: "/employee_schedule" }));
  },
};
