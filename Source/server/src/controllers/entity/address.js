import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("address", req.params);
  },
  post: async (req, res) => {
    const { line1, line2, city, state, zip } = req.body;
    return await queryDatabase(
      `INSERT INTO address(
        line1, line2, city, state, zip
      ) VALUES (?, ?, ?, ?, ?);`,
      [line1, line2, city, state, zip]
    );
  },
  // put: async (req, res) => {
  //   const { id, line1, line2, city, state, zip } = req.body;
  //   return await queryDatabase(
  //     `UPDATE address
  //     SET
  //       line1 = ?,
  //       line2 = ?,
  //       city = ?,
  //       state = ?,
  //       zip = ?
  //     WHERE address.id = ?;`,
  //     [line1, line2, city, state, zip, id]
  //   );
  // },
  // delete: async (req, res) => {
  //   return;
  // },
};
