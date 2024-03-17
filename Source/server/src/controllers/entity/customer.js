import queryDatabase from "../../utils/queryDatabase.js";

export default {
  get: async (req, res) => {
    const { id } = req.params;
    const sql = id
      ? "SELECT * FROM customer_view WHERE customer_id = ?"
      : "SELECT * FROM customer_view";
    const params = id ? [id] : [];
    return await queryDatabase(sql, params);
  },
  post: async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password_hash,
      phone_number,
      phone_country_code,
      profile_picture,
      preferred_branch_id,
      preferred_communication_method,
      line1,
      line2,
      city,
      state,
      zip,
    } = req.body;
    return await queryDatabase(
      `START TRANSACTION;

        INSERT INTO address (line1, line2, city, state, zip)
        SELECT ?, ?, ?, ?, ?
        FROM dual ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);

        INSERT INTO user (
          first_name,
          last_name,
          email,
          password_hash,
          phone_number,
          phone_country_code,
          profile_picture,
          address_id,
          created_at,
          last_login,
          deleted
        ) VALUES (?, ?, ?, ?, ?, ?, ?, LAST_INSERT_ID(), NOW(), NOW(), false);

        INSERT INTO customer (
          user_id,
          preferred_branch_id,
          preferred_communication_method
        ) VALUES (LAST_INSERT_ID(), ?, ?);

      COMMIT;`,
      [
        line1,
        line2,
        city,
        state,
        zip,
        first_name,
        last_name,
        email,
        password_hash,
        phone_number,
        phone_country_code,
        profile_picture,
        preferred_branch_id,
        preferred_communication_method,
      ]
    );
  },
  put: async (req, res) => {
    const {
      id,
      first_name,
      last_name,
      email,
      password_hash,
      phone_number,
      phone_country_code,
      profile_picture,
      preferred_branch_id,
      preferred_communication_method,
      line1,
      line2,
      city,
      state,
      zip,
    } = req.body;
    return await queryDatabase(
      `START TRANSACTION;

        INSERT INTO address (line1, line2, city, state, zip)
        SELECT ?, ?, ?, ?, ?
        FROM dual ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);

        UPDATE user
        JOIN customer ON user.id = customer.user_id
        SET
          user.first_name = ?,
          user.last_name = ?,
          user.email = ?,
          user.password_hash = ?,
          user.phone_number = ?,
          user.phone_country_code = ?,
          user.profile_picture = ?,
          user.address_id = LAST_INSERT_ID(),
          customer.preferred_branch_id = ?,
          customer.preferred_communication_method = ?
        WHERE customer.id = ?;
        
      COMMIT;`,
      [
        line1,
        line2,
        city,
        state,
        zip,
        first_name,
        last_name,
        email,
        password_hash,
        phone_number,
        phone_country_code,
        profile_picture,
        preferred_branch_id,
        preferred_communication_method,
        id,
      ]
    );
  },
  delete: async (req, res) => {
    const { id } = req.body;
    return await queryDatabase(
      `UPDATE user
      JOIN customer ON user.id = customer.user_id
      SET user.deleted = 1
      WHERE customer.id = ?;`,
      [id]
    );
  },
};
