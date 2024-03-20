import queryDatabase from "../../utils/queryDatabase.js";

export default {
  get: async (req, res) => {
    const { id } = req.params;
    const sql = id
      ? "SELECT * FROM package WHERE package = ?"
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
    return;
  },
  delete: async (req, res) => {
    return;
  },
};
