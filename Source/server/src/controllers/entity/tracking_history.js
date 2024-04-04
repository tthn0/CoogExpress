import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("tracking_history", req.params);
  },
  post: async (req, res) => {
    const { package_id, address_id, timestamp, status } = req.body;
    return await queryDatabase(
      `INSERT INTO tracking_history(
        package_id,
        address_id,
        timestamp,
        status
      ) VALUES (?, ?, ?, ?);`,
      [package_id, address_id, timestamp, status]
    );
  },
  put: async (req, res) => {
    const { id, package_id, address_id, timestamp, status } = req.body;
    return await queryDatabase(
      `UPDATE tracking_history
      SET
        tracking_history.package_id = ?,
        tracking_history.address_id = ?,
        tracking_history.timestamp = ?,
        tracking_history.status = ?
      WHERE tracking_history.id = ?;`,
      [package_id, address_id, timestamp, status, id]
    );
  },
  // delete: async (req, res) => {
  //   return;
  // },
};
