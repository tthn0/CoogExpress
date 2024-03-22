import queryDatabase from "../../utils/queryDatabase.js";

export default {
  get: async (req, res) => {
    const { id } = req.params;
    const sql = id
      ? "SELECT * FROM tracking_history WHERE id = ?"
      : "SELECT * FROM tracking_history";
    const params = id ? [id] : [];
    return await queryDatabase(sql, params);
  },
  post: async (req, res) => {
    const {
      package_id,
      address_id,
      timestamp,
      status
    } = req.body;
    return await queryDatabase(
      `INSERT INTO tracking_history(
        package_id,
        address_id,
        timestamp,
        status
      ) VALUES (?, ?, ?, ?);
      `,
      [
        package_id,
        address_id,
        timestamp,
        status
      ]
    );
  },
  put: async (req, res) => {
    const {
      id,
      package_id,
      address_id,
      timestamp,
      status
    } = req.body;
    return await queryDatabase(
      `
      UPDATE tracking_history
      SET
        tracking_history.package_id = ?,
        tracking_history.address_id = ?,
        tracking_history.timestamp = ?,
        tracking_history.status = ?
      WHERE tracking_history.id = ?;
      `,
      [
        package_id,
        address_id,
        timestamp,
        status,
        id
      ]
    );
  },
  delete: async (req, res) => {
    return;
  },
};
