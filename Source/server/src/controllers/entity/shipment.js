import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("shipment", req.params);
  },
  post: async (req, res) => {
    const { package_id, route_id } = req.body;
    return await queryDatabase(
      `INSERT INTO shipment(
        package_id,
        route_id
      ) VALUES (?, ?);`,
      [package_id, route_id]
    );
  },
  put: async (req, res) => {
    const { id, package_id, route_id } = req.body;
    return await queryDatabase(
      `UPDATE shipment
      SET
        shipment.package_id = ?,
        shipment.route_id = ?
      WHERE shipment.id = ?;`,
      [package_id, route_id, id]
    );
  },
  // delete: async (req, res) => {
  //   return;
  // },
};
