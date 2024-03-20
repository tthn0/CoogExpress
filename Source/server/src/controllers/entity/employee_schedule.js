import queryDatabase from "../../utils/queryDatabase.js";

export default {
  get: async (req, res) => {
    const { id } = req.params;
    const sql = id
      ? "SELECT * FROM employee_schedule WHERE id = ?"
      : "SELECT * FROM employee_schedule";
    const params = id ? [id] : [];
    return await queryDatabase(sql, params);
  },
  post: async (req, res) => {
    const {
      employee_id,
      start_timestamp,
      end_timestamp
    } = req.body;
    return await queryDatabase(
      `INSERT INTO employee_schedule (
        employee_id,
        start_timestamp,
        end_timestamp
      ) VALUES (?, ?, ?);
      `,
      [
        employee_id,
        start_timestamp,
        end_timestamp
      ]
    );
  },
  put: async (req, res) => {
    const {
      id,
      employee_id,
      start_timestamp,
      end_timestamp
    } = req.body;
    return await queryDatabase(
      `
      UPDATE employee_schedule
      SET
        employee_schedule.employee_id = ?,
        employee_schedule.start_timestamp = ?,
        employee_schedule.end_timestamp = ?
      WHERE employee_schedule.id = ?;
      `,
      [
        employee_id,
        start_timestamp,
        end_timestamp,
        id
      ]
    );
  },
  delete: async (req, res) => {
    return;
  },
};
