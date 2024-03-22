import queryDatabase from "../../utils/queryDatabase.js";

export default {
  get: async (req, res) => {
    const { id } = req.params;
    const sql = id
      ? "SELECT * FROM branch WHERE id = ?"
      : "SELECT * FROM branch";
    const params = id ? [id] : [];
    return await queryDatabase(sql, params);
  },
  post: async (req, res) => {
    const {
      address_id,
      manager_employee_id,
      name,
      phone_number,
      email,
      opening_time,
      closing_time
    } = req.body;
    return await queryDatabase(
      `INSERT INTO branch(
        address_id,
        manager_employee_id,
        name,
        phone_number,
        email,
        opening_time,
        closing_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?);
      `,
      [
        address_id,
        manager_employee_id,
        name,
        phone_number,
        email,
        opening_time,
        closing_time
      ]
    );
  },
  put: async (req, res) => {
    const{
      id,
      address_id,
      manager_employee_id,
      name,
      phone_number,
      email,
      opening_time,
      closing_time
    } = req.body;
    return await queryDatabase(
      `
      UPDATE branch
      SET
        branch.address_id = ?,
        branch.manager_employee_id = ?,
        branch.name = ?,
        branch.phone_number = ?,
        branch.email = ?,
        branch.opening_time = ?,
        branch.closing_time = ?
      WHERE branch.id = ?;
      `,
      [
        address_id,
        manager_employee_id,
        name,
        phone_number,
        email,
        opening_time,
        closing_time,
        id
      ]
    );
  },
  delete: async (req, res) => {
    return;
  },
};
