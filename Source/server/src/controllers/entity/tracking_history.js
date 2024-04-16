import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("tracking_history_view", req.params);
  },
  post: async (req, res) => {
    const { package_id, line1, line2, city, state, zip, status } = req.body;
    return await queryDatabase(
      `START TRANSACTION;

        INSERT INTO address (line1, line2, city, state, zip)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);

        INSERT INTO tracking_history(
          package_id,
          address_id,
          timestamp,
          status
        ) VALUES (?, LAST_INSERT_ID(), NOW(), ?);

      COMMIT;`,
      [line1, line2, city, state, zip, package_id, status]
    );
  },
  // put: async (req, res) => {
  //   const { id, package_id, address_id, timestamp, status } = req.body;
  //   return await queryDatabase(
  //     `UPDATE tracking_history
  //     SET
  //       package_id = ?,
  //       address_id = ?,
  //       timestamp = ?,
  //       status = ?
  //     WHERE id = ?;`,
  //     [package_id, address_id, timestamp, status, id]
  //   );
  // },
  // delete: async (req, res) => {
  //   return;
  // },
};
