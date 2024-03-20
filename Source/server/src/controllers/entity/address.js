import queryDatabase from "../../utils/queryDatabase.js";

export default {
  get: async (req, res) => {
    const { id } = req.params;
    const sql = id
      ? "SELECT * FROM address WHERE id = ?"
      : "SELECT * FROM address";
    const params = id ? [id] : [];
    return await queryDatabase(sql, params);
  },
  post: async (req, res) => {
    const {
      line1,
      line2,
      city,
      state,
      zip
    } = req.body;
    return await queryDatabase(
      `INSERT INTO address(
        line1,
        line2,
        city,
        state,
        zip
      ) VALUES (?, ?, ?, ?, ?);
      `,
      [
        line1,
        line2,
        city,
        state,
        zip
      ]
    );
  },
  put: async (req, res) => {
    const {
      id,
      line1,
      line2,
      city,
      state,
      zip
    } = req.body;
    return await queryDatabase(
      `
      UPDATE address
      SET
        address.line1 = ?,
        address.line2 = ?,
        address.city = ?,
        address.state = ?,
        address.zip = ?
      WHERE address.id = ?;
      `,
      [
        line1,
        line2,
        city,
        state,
        zip,
        id
      ]
    );
  },
  delete: async (req, res) => {
    return;
  },
};
