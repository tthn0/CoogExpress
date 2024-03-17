import queryDatabase from "../../utils/queryDatabase.js";

export default {
  get: async (req, res) => {
    const { id } = req.params;
    const sql = id
      ? "SELECT * FROM employee_view WHERE employee_id = ?"
      : "SELECT * FROM employee_view";
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
      branch_id,
      supervisor_employee_id,
      date_of_birth,
      gender,
      driver_license_number,
      role,
      shirt_size,
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

        INSERT INTO employee (
          user_id,
          branch_id,
          supervisor_employee_id,
          date_of_birth,
          gender,
          driver_license_number,
          role,
          shirt_size
        ) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?, ?, ?);

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
        branch_id,
        supervisor_employee_id,
        date_of_birth,
        gender,
        driver_license_number,
        role,
        shirt_size,
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
      branch_id,
      supervisor_employee_id,
      date_of_birth,
      gender,
      driver_license_number,
      role,
      shirt_size,
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
        JOIN employee ON user.id = employee.user_id
        SET
          user.first_name = ?,
          user.last_name = ?,
          user.email = ?,
          user.password_hash = ?,
          user.phone_number = ?,
          user.phone_country_code = ?,
          user.profile_picture = ?,
          employee.branch_id = ?,
          employee.supervisor_employee_id = ?,
          employee.date_of_birth = ?,
          employee.gender = ?,
          employee.driver_license_number = ?,
          employee.role = ?,
          employee.shirt_size = ?,
          user.address_id = LAST_INSERT_ID()
        WHERE employee.id = ?;

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
        branch_id,
        supervisor_employee_id,
        date_of_birth,
        gender,
        driver_license_number,
        role,
        shirt_size,
        id,
      ]
    );
  },
  delete: async (req, res) => {
    const { id } = req.body;
    return await queryDatabase(
      `UPDATE user
      JOIN employee ON user.id = employee.user_id
      SET user.deleted = 1
      WHERE employee.id = ?;`,
      [id]
    );
  },
};
