import queryDatabase from "../../utils/queryDatabase.js";

export default {
  get: async (req, res) => {
    const { id } = req.params;
    const sql = id
      ? "SELECT * FROM route WHERE id = ?"
      : "SELECT * FROM route";
    const params = id ? [id] : [];
    return await queryDatabase(sql, params);
  },
  post: async (req, res) => {
    const {
      start_address_id,
      end_address_id,
      driver_employee_id,
      start_timestamp,
      end_timestamp,
      type,
      distance
    } = req.body;
    return await queryDatabase(
      `INSERT INTO route(
        start_address_id,
        end_address_id,
        driver_employee_id,
        start_timestamp,
        end_timestamp,
        type,
        distance
      ) VALUES (?, ?, ?, ?, ?, ?, ?);
      `,
      [
        start_address_id,
        end_address_id,
        driver_employee_id,
        start_timestamp,
        end_timestamp,
        type,
        distance
      ]
    );
  },
  put: async (req, res) => {
    const {
      id,
      start_address_id,
      end_address_id,
      driver_employee_id,
      start_timestamp,
      end_timestamp,
      type,
      distance
    } = req.body;
    return await queryDatabase(
      `
      UPDATE route
      SET
        route.start_address_id = ?,
        route.end_address_id = ?,
        route.driver_employee_id = ?,
        route.start_timestamp = ?,
        route.end_timestamp = ?,
        route.type = ?,
        route.distance = ?
      WHERE route.id = ?;
      `,
      [
        start_address_id,
        end_address_id,
        driver_employee_id,
        start_timestamp,
        end_timestamp,
        type,
        distance,
        id
      ]
    );
  },
  delete: async (req, res) => {
    return;
  },
};
