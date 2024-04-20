import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  post: async (req, res) => {
    const { user_id, branch_id } = req.body;

    let user_cart = await queryDatabase(`
      SELECT *
      FROM shopping_cart_view
      WHERE user_id = ?
    `, [user_id]);

    let product_ids = []
    let prices = []
    let qty_bought = []
    for (let i = 0; i < user_cart.length; i++) {
      product_ids[i] = user_cart[i].product_id
      prices[i] = user_cart[i].price
      qty_bought[i] = user_cart[i].product_quantity
    }

    let inventory_of_branch = await queryDatabase(`
      SELECT inventory_id, product_id, quantity_in_stock
      FROM inventory_view
      WHERE branch_id = ? AND (product_id IN (${product_ids.toString()}))
    `, [branch_id])

    let ids = []
    let whens = ``;
    for (let i = 0; i < inventory_of_branch.length; i++) {
      ids[i] = inventory_of_branch[i].inventory_id
      whens += `WHEN id = ${inventory_of_branch[i].inventory_id} THEN ${inventory_of_branch[i].quantity_in_stock - qty_bought[i]}\n`
    }
    ids = ids.toString();

    await queryDatabase(`
      UPDATE inventory
      SET
        quantity_in_stock = 
          CASE
            ${whens}
            ELSE quantity_in_stock
          END
      WHERE id IN (${ids})
    `,)

    let customer = await queryDatabase(`
      SELECT *
      FROM customer_view
      WHERE user_id = ?
    `, [user_id])
    if(customer.length !== 0){
      
      for (let i = 0; i < user_cart.length; i++) {
          const id = product_ids[i];
          let r = await queryDatabase(`
          INSERT INTO receipt(
            customer_id,
            branch_id,
            product_id,
            billing_id,
            amount_bought,
            subtotal,
            tax,
            total,
            timestamp,
            notes
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
        `, 
        [
          customer[0].user_id,
          branch_id,
          id,
          customer[0].billing_id,
          qty_bought[i],
          qty_bought[i] * prices[i],
          qty_bought[i] * prices[i] * 0.0825,
          qty_bought[i] * prices[i] * 1.0825,
          ""
        ])
        console.log(r)
      }
    }

    // Create receipts --------------------------------------------------------

    return await queryDatabase(`
      DELETE
      FROM shopping_cart
      WHERE user_id = ?
  `,[user_id]);
  },
};
