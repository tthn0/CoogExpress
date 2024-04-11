import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("billing", req.params);
  },
  post: async (req, res) => {
    const {
      customer_id,
      address_id,
      card_number,
      cvc,
      expiration_month,
      expiration_year,
      cardholder_name,
    } = req.body;
    return await queryDatabase(
      `INSERT INTO billing(
        customer_id,
        address_id,
        card_number,
        cvc,
        expiration_month,
        expiration_year,
        cardholder_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        customer_id,
        address_id,
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
    } = req.body;
    return await queryDatabase(
      `UPDATE billing
      SET
        customer_id = ?,
        address_id = ?,
        card_number = ?,
        cvc = ?,
        expiration_month = ?,
        expiration_year = ?,
        cardholder_name = ?
      WHERE id = ?;`,
      [
        customer_id,
        address_id,
        card_number,
        cvc,
        expiration_month,
        expiration_year,
        cardholder_name,
        id,
      ]
    );
  },
  delete: async (req, res) => {
    const { id } = req.body;
    return await queryDatabase("DELETE FROM billing WHERE id = ?;", [id]);
  },
};
