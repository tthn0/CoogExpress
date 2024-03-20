import queryDatabase from "../../utils/queryDatabase.js";

export default {
  get: async (req, res) => {
    const { id } = req.params;
    const sql = id
      ? "SELECT * FROM package WHERE id = ?"
      : "SELECT * FROM package";
    const params = id ? [id] : [];
    return await queryDatabase(sql, params);
  },
  post: async (req, res) => {
    const {
      sender_customer_id,
      receiver_customer_id,
      source_branch_id,
      destination_address_id,
      shipment_id,
      type,
      width,
      length,
      height,
      weight,
      special_handling_instructions,
      delivery_instructions,
      base_shipping_cost,
      additional_fees,
    } = req.body;
    return await queryDatabase(
      `INSERT INTO package (
          sender_customer_id,
          receiver_customer_id,
          source_branch_id,
          destination_address_id,
          shipment_id,
          type,
          width,
          length,
          height,
          weight,
          special_handling_instructions,
          delivery_instructions,
          base_shipping_cost,
          additional_fees
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        sender_customer_id,
        receiver_customer_id,
        source_branch_id,
        destination_address_id,
        shipment_id,
        type,
        width,
        length,
        height,
        weight,
        special_handling_instructions,
        delivery_instructions,
        base_shipping_cost,
        additional_fees,
      ]
    );
  },
  put: async (req, res) => {
    const {
      id,
      sender_customer_id,
      receiver_customer_id,
      source_branch_id,
      destination_address_id,
      shipment_id,
      type,
      width,
      length,
      height,
      weight,
      special_handling_instructions,
      delivery_instructions,
      base_shipping_cost,
      additional_fees,
    } = req.body;
    return await queryDatabase(
      `
      UPDATE package
      SET
        package.sender_customer_id = ?,
        package.receiver_customer_id = ?,
        package.source_branch_id = ?,
        package.destination_address_id = ?,
        package.shipment_id = ?,
        package.type = ?,
        package.width = ?,
        package.length = ?,
        package.height = ?,
        package.weight = ?,
        package.special_handling_instructions = ?,
        package.delivery_instructions = ?,
        package.base_shipping_cost = ?,
        package.additional_fees = ?
      WHERE package.id = ?;
      `,
      [
        sender_customer_id,
        receiver_customer_id,
        source_branch_id,
        destination_address_id,
        shipment_id,
        type,
        width,
        length,
        height,
        weight,
        special_handling_instructions,
        delivery_instructions,
        base_shipping_cost,
        additional_fees,
        id,
      ]
    );
  },
  delete: async (req, res) => {
    return;
  },
};
