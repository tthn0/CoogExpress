import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("receipt_view", req.params);
  },
  post: async (req, res) => {
    const {
      customer_id,
      package_id,
      branch_id,
      billing_id,
      subtotal,
      tax,
      total,
      timestamp,
      notes,
    } = req.body;
    return await queryDatabase(
      `INSERT INTO receipt(
        customer_id,
        package_id,
        branch_id,
        billing_id,
        subtotal,
        tax,
        total,
        timestamp,
        notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        customer_id,
        package_id,
        branch_id,
        billing_id,
        subtotal,
        tax,
        total,
        timestamp,
        notes,
      ]
    );
  },
  put: async (req, res) => {
    const {
      id,
      customer_id,
      package_id,
      branch_id,
      billing_id,
      subtotal,
      tax,
      total,
      timestamp,
      notes,
    } = req.body;
    return await queryDatabase(
      `UPDATE receipt
      SET
        customer_id = ?,
        package_id = ?,
        branch_id = ?,
        billing_id = ?,
        subtotal = ?,
        tax = ?,
        total = ?,
        timestamp = ?,
        notes = ?
      WHERE id = ?;`,
      [
        customer_id,
        package_id,
        branch_id,
        billing_id,
        subtotal,
        tax,
        total,
        timestamp,
        notes,
        id,
      ]
    );
  },
  // delete: async (req, res) => {
  //   return;
  // },
};
