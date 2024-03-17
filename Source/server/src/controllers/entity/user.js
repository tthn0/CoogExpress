import queryDatabase from "../../utils/queryDatabase.js";

export default {
  // No need to directly interact with the user table
  // get: async (req, res) => {
  //   const { id } = req.params;
  //   const sql = id ? "SELECT * FROM user WHERE id = ?" : "SELECT * FROM user";
  //   const params = id ? [id] : [];
  //   return await queryDatabase(sql, params);
  // },
  // post: async (req, res) => {
  //   const {
  //     first_name,
  //     last_name,
  //     email,
  //     password_hash,
  //     phone_number,
  //     phone_country_code,
  //     address_id,
  //   } = req.body;
  //   return await queryDatabase(
  //     `INSERT INTO user (
  //       first_name,
  //       last_name,
  //       email,
  //       password_hash,
  //       phone_number,
  //       phone_country_code,
  //       address_id,
  //       created_at,
  //       last_login,
  //       deleted
  //     ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), false)`,
  //     [
  //       first_name,
  //       last_name,
  //       email,
  //       password_hash,
  //       phone_number,
  //       phone_country_code,
  //       address_id,
  //     ]
  //   );
  // },
  // put: async (req, res) => {
  //   const {
  //     first_name,
  //     last_name,
  //     email,
  //     password_hash,
  //     phone_number,
  //     phone_country_code,
  //     address_id,
  //     id,
  //   } = req.body;
  //   return await queryDatabase(
  //     `UPDATE user SET
  //       first_name = ?,
  //       last_name = ?,
  //       email = ?,
  //       password_hash = ?,
  //       phone_number = ?,
  //       phone_country_code = ?,
  //       address_id = ?
  //     WHERE id = ?`,
  //     [
  //       first_name,
  //       last_name,
  //       email,
  //       password_hash,
  //       phone_number,
  //       phone_country_code,
  //       address_id,
  //       id,
  //     ]
  //   );
  // },
  // delete: async (req, res) => {
  //   const { id } = req.body;
  //   return await queryDatabase(
  //     `UPDATE user
  //     SET deleted = TRUE
  //     WHERE id = ?`,
  //     [id]
  //   );
  // },
};
