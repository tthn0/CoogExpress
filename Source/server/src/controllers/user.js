import queryDatabase from "../utils/queryDatabase.js";
import parseQueryParams from "../utils/parseQueryParams.js";

export default {
  get: async (req, res) => {
    const { id } = parseQueryParams(req);
    const sql = id ? "SELECT * FROM user WHERE id = ?" : "SELECT * FROM user";
    const params = id ? [id] : [];
    const result = await queryDatabase(sql, params);
    res.end(JSON.stringify(result));
  },
  post: async (req, res) => {
    const result = await queryDatabase(
      `INSERT INTO user (
          first_name,
          last_name,
          email,
          password_hash,
          phone_number,
          phone_country_code,
          address_id,
          account_creation,
          last_login,
          deleted
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [...Object.values(parseQueryParams(req)), new Date(), new Date(), false]
    );
    res.end(JSON.stringify(result));
  },
  patch: async (req, res) => {
    const result = await queryDatabase(
      `UPDATE user SET
        first_name = ?,
        last_name = ?,
        email = ?,
        password_hash = ?,
        phone_number = ?,
        phone_country_code = ?,
        address_id = ?
      WHERE id = ?`,
      Object.values(parseQueryParams(req))
    );
    res.end(JSON.stringify(result));
  },
  delete: async (req, res) => {
    const { id } = parseQueryParams(req);
    const result = await queryDatabase(
      `UPDATE user SET deleted = TRUE WHERE id = ?`,
      [id]
    );
    res.end(JSON.stringify(result));
  },
};
