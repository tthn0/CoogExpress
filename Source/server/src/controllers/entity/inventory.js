import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("inventory_view", req.params);
  },
  post: async (req, res) => {
    const {
      branch_id,
      product_id,
      quantity_in_stock,
      stock_alert_threshold,
    } = req.body;
    return await queryDatabase(
      `INSERT INTO inventory(
        branch_id,
        product_id,
        quantity_in_stock,
        stock_alert_threshold,
        last_stock_update
      ) VALUES (?, ?, ?, ?, NOW());`,
      [
        branch_id,
        product_id,
        quantity_in_stock,
        stock_alert_threshold,
      ]
    );
  },
  put: async (req, res) => {
    const {
      id,
      branch_id,
      product_id,
      quantity_in_stock,
      stock_alert_threshold,
    } = req.body;
    return await queryDatabase(
      `UPDATE inventory
      SET
        branch_id = ?,
        product_id = ?,
        quantity_in_stock = ?,
        stock_alert_threshold = ?,
        last_stock_update = NOW()
      WHERE id = ?;`,
      [branch_id, product_id, quantity_in_stock, stock_alert_threshold, id]
    );
  },
  // delete: async (req, res) => {
  //   return;
  // },
};
