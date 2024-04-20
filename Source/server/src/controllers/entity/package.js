import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("package_view", req.params);
  },
  post: async (req, res) => {
    const {
      type,
      width,
      length,
      height,
      weight,
      special_handling_instructions,
      delivery_instructions,
      base_shipping_cost,
      additional_fees,
      speed,
      sender_username,
      receiver_username,
      source_branch_id,
      destination_address_line1,
      destination_address_line2,
      destination_address_city,
      destination_address_state,
      destination_address_zip,
    } = req.body;

    const [sender, receiver] = await Promise.all([
      queryDatabase("SELECT * FROM customer_view WHERE username = ?", [
        sender_username,
      ]),
      queryDatabase("SELECT * FROM customer_view WHERE username = ?", [
        receiver_username,
      ]),
    ]);

    return await queryDatabase(
      `START TRANSACTION;

        INSERT INTO address (line1, line2, city, state, zip)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);

        INSERT INTO package(
          sender_customer_id,
          receiver_customer_id,
          source_branch_id,
          destination_address_id,
          type,
          width,
          length,
          height,
          weight,
          special_handling_instructions,
          delivery_instructions,
          base_shipping_cost,
          additional_fees,
          speed
        ) VALUES (?, ?, ?, LAST_INSERT_ID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        
        COMMIT;`,
      [
        destination_address_line1,
        destination_address_line2,
        destination_address_city,
        destination_address_state,
        destination_address_zip,
        sender[0].customer_id,
        receiver[0].customer_id,
        source_branch_id,
        type,
        width,
        length,
        height,
        weight,
        special_handling_instructions,
        delivery_instructions,
        base_shipping_cost,
        additional_fees,
        speed,
      ]
    );
  },
  // put: async (req, res) => {
  //   const {
  //     id,
  //     sender_customer_id,
  //     receiver_customer_id,
  //     source_branch_id,
  //     destination_address_id,
  //     shipment_id,
  //     type,
  //     width,
  //     length,
  //     height,
  //     weight,
  //     special_handling_instructions,
  //     delivery_instructions,
  //     base_shipping_cost,
  //     additional_fees,
  //   } = req.body;
  //   return await queryDatabase(
  //     `UPDATE package
  //     SET
  //       package.sender_customer_id = ?,
  //       package.receiver_customer_id = ?,
  //       package.source_branch_id = ?,
  //       package.destination_address_id = ?,
  //       package.shipment_id = ?,
  //       package.type = ?,
  //       package.width = ?,
  //       package.length = ?,
  //       package.height = ?,
  //       package.weight = ?,
  //       package.special_handling_instructions = ?,
  //       package.delivery_instructions = ?,
  //       package.base_shipping_cost = ?,
  //       package.additional_fees = ?
  //     WHERE package.id = ?;`,
  //     [
  //       sender_customer_id,
  //       receiver_customer_id,
  //       source_branch_id,
  //       destination_address_id,
  //       shipment_id,
  //       type,
  //       width,
  //       length,
  //       height,
  //       weight,
  //       special_handling_instructions,
  //       delivery_instructions,
  //       base_shipping_cost,
  //       additional_fees,
  //       id,
  //     ]
  //   );
  // },
  // delete: async (req, res) => {
  //   return;
  // },
};
