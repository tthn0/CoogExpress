import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("receipt", req.params);
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
        receipt.customer_id = ?,
        receipt.package_id = ?,
        receipt.branch_id = ?,
        receipt.billing_id = ?,
        receipt.subtotal = ?,
        receipt.tax = ?,
        receipt.total = ?,
        receipt.timestamp = ?,
        receipt.notes = ?
      WHERE receipt.id = ?;`,
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
