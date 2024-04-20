// Retrieves all packages that are not from the supplied branch but have gone through the supplied branch.

import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    const { branch_id } = req.params;
    return await queryDatabase(
      `SELECT p.*
      FROM
        package_view as p JOIN
        tracking_history as t ON
        p.package_id = t.package_id
      WHERE
        p.source_branch_id != ? AND
        t.status = "Pending" AND
        t.address_id = (
          SELECT address_id FROM branch WHERE id = ?
        );`,
      [branch_id, branch_id]
    );
  },
};
