import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("billing", req.params);
  },
  post: async (req, res) => {
    const {
      customer_id,
      line1,
      line2,
      city,
      state,
      zip,
      card_number,
      cvc,
      expiration_month,
      expiration_year,
      cardholder_name,
    } = req.body;
    return await queryDatabase(
      `START TRANSACTION;

        INSERT INTO address (line1, line2, city, state, zip)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);

        INSERT INTO billing(
          customer_id,
          address_id,
          card_number,
          cvc,
          expiration_month,
          expiration_year,
          cardholder_name,
          preferred
        ) VALUES (?, LAST_INSERT_ID(), ?, ?, ?, ?, ?, FALSE);

      COMMIT;`,
      [
        line1,
        line2,
        city,
        state,
        zip,
        customer_id,
        card_number,
        cvc,
        expiration_month,
        expiration_year,
        cardholder_name,
      ]
    );
  },
  put: async (req, res) => {
    const {
      id,
      customer_id,
      address_id,
      card_number,
      cvc,
      expiration_month,
      expiration_year,
      cardholder_name,
      preferred,
    } = req.body;
    return await queryDatabase(
      `START TRANSACTION;

        UPDATE billing
        SET preferred = FALSE
        WHERE customer_id = ?;

        UPDATE billing
        SET
          customer_id = ?,
          address_id = ?,
          card_number = ?,
          cvc = ?,
          expiration_month = ?,
          expiration_year = ?,
          cardholder_name = ?,
          preferred = ?
        WHERE id = ?;
      
      COMMIT;`,
      [
        customer_id,
        customer_id,
        address_id,
        card_number,
        cvc,
        expiration_month,
        expiration_year,
        cardholder_name,
        preferred,
        id,
      ]
    );
  },
  delete: async (req, res) => {
    const { id } = req.body;
    return await queryDatabase("DELETE FROM billing WHERE id = ?;", [id]);
  },
};
