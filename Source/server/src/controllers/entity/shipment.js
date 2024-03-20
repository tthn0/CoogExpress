import queryDatabase from "../../utils/queryDatabase.js";

export default {
  get: async (req, res) => {
    const { id } = req.params;
    const sql = id
      ? "SELECT * FROM shipment WHERE id = ?"
      : "SELECT * FROM shipment";
    const params = id ? [id] : [];
    return await queryDatabase(sql, params);
  },
  post: async (req, res) => {
    const {
      package_id,
      route_id
    } = req.body;
    return await queryDatabase(
      `INSERT INTO shipment(
        package_id,
        route_id
      ) VALUES (?, ?);
      `,
      [
        package_id,
        route_id
      ]
    )
  },
  put: async (req, res) => {
    const {
      id,
      package_id,
      route_id
    } = req.body;
    return await queryDatabase(
      `
      UPDATE shipment
      SET
        shipment.package_id = ?,
        shipment.route_id = ?
      WHERE shipment.id = ?;
      `,
      [
        package_id,
        route_id,
        id
      ]
    );
  },
  delete: async (req, res) => {
    return;
  },
};
