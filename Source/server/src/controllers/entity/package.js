import queryDatabase from "../../utils/queryDatabase.js";

export default {
  get: async (req, res) => {
    const { id } = req.params;
    const sql = id
      ? "SELECT * FROM package_view WHERE package_id = ?"
      : "SELECT * FROM package_view";
    const params = id ? [id] : [];
    return await queryDatabase(sql, params);
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
      sender_username,
      receiver_username,
      source_branch_id,
      destination_address_line1,
      destination_address_line2,
      destination_address_city,
      destination_address_state,
      destination_address_zip,
    } = req.body;

    const [sender, receiver, address] = await Promise.all([
      queryDatabase("SELECT * FROM customer_view WHERE username = ?", [
        sender_username,
      ]),
      queryDatabase("SELECT * FROM customer_view WHERE username = ?", [
        receiver_username,
      ]),
      queryDatabase(
        `SELECT * 
        FROM address 
        WHERE
          line1 = ? AND
          line2 = ? AND
          city = ? AND
          state = ? AND
          zip = ?;`,
        [
          destination_address_line1,
          destination_address_line2,
          destination_address_city,
          destination_address_state,
          destination_address_zip,
        ]
      ),
    ]);

    if (sender.length == 0) {
      return {
        error: "Sender username must be valid.",
      };
    } else if (receiver.length == 0) {
      return {
        error: "Receiver username must be valid.",
      };
    }

    let address_id;

    if (address.length) {
      address_id = address[0].id;
    } else {
      address = await queryDatabase(
        `INSERT INTO address(
          line1,
          line2,
          city,
          state,
          zip
        ) VALUES (?, ?, ?, ?, ?);`,
        [
          destination_address_line1,
          destination_address_line2,
          destination_address_city,
          destination_address_state,
          destination_address_zip,
        ]
      );
      address_id = address.insertId;
    }

    const new_package = await queryDatabase(
      `INSERT INTO package(
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
        additional_fees
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        sender[0].customer_id,
        receiver[0].customer_id,
        source_branch_id,
        address_id,
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

    // const branch = await queryDatabase(
    //   `SELECT address_id FROM branch WHERE id = ?`,
    //   source_branch_id
    // );

    // const branch_address_id = branch[0].address_id;

    // await queryDatabase(
    //   `INSERT INTO tracking_history (
    //     package_id,
    //     address_id,
    //     timestamp,
    //     status
    //   ) VALUES (?, ?, NOW(), ?);`,
    //   [new_package.insertId, branch_address_id, "Pre-Shipment"]
    // );

    return new_package;
  },
  put: async (req, res) => {
    // const {
    //   id,
    //   sender_customer_id,
    //   receiver_customer_id,
    //   source_branch_id,
    //   destination_address_id,
    //   shipment_id,
    //   type,
    //   width,
    //   length,
    //   height,
    //   weight,
    //   special_handling_instructions,
    //   delivery_instructions,
    //   base_shipping_cost,
    //   additional_fees,
    // } = req.body;
    // return await queryDatabase(
    //   `
    //   UPDATE package
    //   SET
    //     package.sender_customer_id = ?,
    //     package.receiver_customer_id = ?,
    //     package.source_branch_id = ?,
    //     package.destination_address_id = ?,
    //     package.shipment_id = ?,
    //     package.type = ?,
    //     package.width = ?,
    //     package.length = ?,
    //     package.height = ?,
    //     package.weight = ?,
    //     package.special_handling_instructions = ?,
    //     package.delivery_instructions = ?,
    //     package.base_shipping_cost = ?,
    //     package.additional_fees = ?
    //   WHERE package.id = ?;
    //   `,
    //   [
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
    //     id,
    //   ]
    // );
  },
  // delete: async (req, res) => {
  //   return;
  // },
};
