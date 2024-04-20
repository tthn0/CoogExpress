import { queryDatabase, getBasedOnQueryParams } from "../../utils/database.js";

export default {
  get: async (req, res) => {
    return await getBasedOnQueryParams("product", req.params);
  },
  post: async (req, res) => {
    const {
      sku,
      upc,
      price,
      name,
      description,
      width,
      length,
      height,
      weight,
      image,
    } = req.body;
    return await queryDatabase(
      `INSERT INTO product(
        sku,
        upc,
        price,
        name,
        description,
        width,
        length,
        height,
        weight,
        image,
        deleted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, false);`,
      [sku, upc, price, name, description, width, length, height, weight, image]
    );
  },
  put: async (req, res) => {
    const {
      id,
      sku,
      upc,
      price,
      description,
      width,
      length,
      height,
      weight,
      image,
    } = req.body;
    return await queryDatabase(
      `UPDATE product
      SET
        sku = ?,
        upc = ?,
        price = ?,
        description = ?,
        width = ?,
        length = ?,
        height = ?,
        weight = ?,
        image = ?
      WHERE id = ?;`,
      [sku, upc, price, description, width, length, height, weight, image, id]
    );
  },
  delete: async (req, res) => {
    const { id } = req.body;
    return await queryDatabase(
      `UPDATE product
      SET deleted = 1
      WHERE id = ?;`,
      [id]
    );
  },
};
