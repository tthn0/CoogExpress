import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("route_view", req.params);
  },
  post: async (req, res) => {
    console.log(req.body);
    const { source_branch_id, destination_branch_id, packages } = req.body;
    const route = await queryDatabase(
      `INSERT INTO route(
        source_branch_id,
        destination_branch_id
      ) VALUES (?, ?);`,
      [source_branch_id, destination_branch_id]
    );
    if (route.errno) return route;
    const responses = await Promise.all(
      packages?.map((packageId) => {
        return queryDatabase(
          `INSERT INTO shipment(
            package_id,
            route_id
          ) VALUES (?, ?);`,
          [packageId, route.insertId]
        );
      })
    );
    for (const response of responses) {
      if (response.errno) return response;
    }
    return route;
  },
  put: async (req, res) => {
    const {
      id,
      source_branch_id,
      destination_branch_id,
      driver_employee_id,
      start_timestamp,
      end_timestamp,
    } = req.body;
    return await queryDatabase(
      `UPDATE route
      SET
      source_branch_id = ?,
        destination_branch_id = ?,
        driver_employee_id = ?,
        start_timestamp = ?,
        end_timestamp = ?,
      WHERE id = ?;`,
      [
        source_branch_id,
        destination_branch_id,
        driver_employee_id,
        start_timestamp,
        end_timestamp,
        id,
      ]
    );
  },
  // delete: async (req, res) => {
  //   return;
  // },
};
