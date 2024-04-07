import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("branch_view", req.params);
  },
  post: async (req, res) => {
    const {
      address_id,
      manager_employee_id,
      name,
      phone_number,
      email,
      opening_time,
      closing_time,
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        address_id,
        manager_employee_id,
        name,
        phone_number,
        email,
        opening_time,
        closing_time,
      ]
    );
  },
  put: async (req, res) => {
    const {
      id,
      address_id,
      manager_employee_id,
      name,
      phone_number,
      email,
      opening_time,
      closing_time,
    } = req.body;
    return await queryDatabase(
      `UPDATE branch
      SET
        address_id = ?,
        manager_employee_id = ?,
        name = ?,
        phone_number = ?,
        email = ?,
        opening_time = ?,
        closing_time = ?
      WHERE branch.id = ?;`,
      [
        address_id,
        manager_employee_id,
        name,
        phone_number,
        email,
        opening_time,
        closing_time,
        id,
      ]
    );
  },
  // delete: async (req, res) => {
  //   return;
  // },
};
