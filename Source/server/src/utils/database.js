import dotenv from "dotenv";
import mysql from "mysql2/promise";

const __dirname = import.meta.dirname;
dotenv.config({ path: __dirname + "/../../.env" });

const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_PASS", "DB_NAME"];
const emptyEnvVars = requiredEnvVars.filter(
  (variable) => !process.env[variable]
);

if (emptyEnvVars.length > 0)
  throw new Error(
    `Environment variables (${emptyEnvVars.join(", ")}) are empty.`
  );

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

const queryDatabase = async (sql, params = []) => {
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

const getBasedOnQueryParams = async (table, params) => {
  const columnInfoArray = await queryDatabase(`SHOW COLUMNS FROM ${table}`);
  const validColumnArray = columnInfoArray.map((column) => column.Field);
  const validColumnSet = new Set(validColumnArray); // For O(1) lookups

  const candidateColumnArray = Object.keys(params);
  const valuesToEscape = Object.values(params);

  const invalidColumns = candidateColumnArray.filter(
    (column) => !validColumnSet.has(column)
  );

  if (invalidColumns.length > 0)
    throw {
      error: `Some requested columns do not exist in table \`${table}\`.`,
      invalidColumns,
    };

  let sql = `SELECT * FROM ${table}`;

  if (candidateColumnArray.length > 0) {
    const whereCondition = candidateColumnArray.map((key) => `${key} = ?`);
    sql += " WHERE " + whereCondition.join(" AND ");
  }

  return await queryDatabase(sql, valuesToEscape);
};

export { queryDatabase, getBasedOnQueryParams };
