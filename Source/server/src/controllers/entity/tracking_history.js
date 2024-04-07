import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("tracking_history", req.params);
  },
  post: async (req, res) => {
    const { package_id, line1, line2, city, state, zip, status } = req.body;

    const address = await queryDatabase(
      `SELECT * FROM address 
      WHERE
        line1 = ? AND
        line2 = ? AND
        city = ? AND
        state = ? AND
        zip = ?;`,
      [line1, line2, city, state, zip]
    );

    let address_id;

    if (address.length > 0) {
      address_id = address[0].id;
    } else {
      const address = await queryDatabase(
        `INSERT INTO address(
          line1,
          line2,
          city,
          state,
          zip
        ) VALUES (?, ?, ?, ?, ?);`,
        [line1, line2, city, state, zip]
      );
      address_id = address.insertId;
    }

    return await queryDatabase(
      `INSERT INTO tracking_history(
        package_id,
        address_id,
        timestamp,
        status
      ) VALUES (?, ?, NOW(), ?);`,
      [package_id, address_id, status]
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
