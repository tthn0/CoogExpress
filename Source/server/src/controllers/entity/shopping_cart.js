import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("shopping_cart_view", req.params);
  },
  post: async (req, res) => {
    const { user_id, branch_id, product_id, quantity } = req.body;

    const cartItem = await queryDatabase(
      `SELECT *
      FROM shopping_cart
      WHERE branch_id = ? AND product_id = ?;`,
      [branch_id, product_id]
    );

    if (cartItem.length > 0) {
      let q = cartItem[0]?.quantity;
      return await queryDatabase(
        `UPDATE shopping_cart
        SET quantity = ?
        WHERE id = ?;`,
        [q + quantity, cartItem[0]?.id]
      );
    }

    return await queryDatabase(
      `INSERT INTO shopping_cart (
        user_id,
        branch_id,
        product_id,
        quantity
      ) VALUES (?, ?, ?, ?);`,
      [user_id, branch_id, product_id, quantity]
    );
  },
  put: async (req, res) => {
    const { id, user_id, branch_id, quantity } = req.body;

    if (user_id && branch_id) {
      return await queryDatabase(
        `UPDATE shopping_cart
        SET branch_id = ?
        WHERE user_id = ?;`,
        [branch_id, user_id]
      );
    }

    if (quantity) {
      return await queryDatabase(
        `UPDATE shopping_cart
        SET quantity = ?
        WHERE id = ?;`,
        [quantity, id]
      );
    }

    return;
  },
  delete: async (req, res) => {
    const { user_id, product_id } = req.body;

    if (product_id) {
      return await queryDatabase(
        `DELETE FROM shopping_cart
        WHERE user_id = ? AND product_id = ?;`,
        [user_id, product_id]
      );
    } else {
      return await queryDatabase(
        `DELETE FROM shopping_cart
        WHERE user_id = ?;`,
        [user_id]
      );
    }
  },
};
