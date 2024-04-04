import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("inventory", req.params);
  },
  post: async (req, res) => {
    const {
      branch_id,
      product_id,
      quantity_in_stock,
      stock_alert_threshold,
      last_stock_update,
    } = req.body;
    return await queryDatabase(
      `INSERT INTO inventory(
        branch_id,
        product_id,
        quantity_in_stock,
        stock_alert_threshold,
        last_stock_update
      ) VALUES (?, ?, ?, ?, ?);`,
      [
        branch_id,
        product_id,
        quantity_in_stock,
        stock_alert_threshold,
        last_stock_update,
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
      last_stock_update,
    } = req.body;
    return await queryDatabase(
      `UPDATE inventory
      SET
        inventory.branch_id = ?,
        inventory.product_id = ?,
        inventory.quantity_in_stock = ?,
        inventory.stock_alert_threshold = ?,
        inventory.last_stock_update = ?
      WHERE inventory.id = ?;`,
      [
        branch_id,
        product_id,
        quantity_in_stock,
        stock_alert_threshold,
        last_stock_update,
        id,
      ]
    );
  },
  // delete: async (req, res) => {
  //   return;
  // },
};
