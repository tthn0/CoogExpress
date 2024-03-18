import dotenv from "dotenv";
import mysql from "mysql2/promise";

const __dirname = import.meta.dirname;
dotenv.config({ path: __dirname + "/../../.env" });

const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_PASS", "DB_NAME"];
const emptyEnvVars = requiredEnvVars.filter(
  (variable) => !process.env[variable]
);

if (emptyEnvVars.length > 0) {
  throw new Error(
    `Environment variables (${emptyEnvVars.join(", ")}) are empty.`
  );
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

export default async (sql, params = []) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.query(sql, params);
    return result;
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.release();
  }
};
