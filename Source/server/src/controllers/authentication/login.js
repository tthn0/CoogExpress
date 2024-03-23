import jwt from "jsonwebtoken";
import queryDatabase from "../../utils/queryDatabase.js";

// No bcrypt for simplicity
const comparePassword = async (password1, password2) => {
  return await (password1 === password2);
};

export default {
  post: async (req, res) => {
    const { username, password } = req.body;
    const [customer_view, employee_view] = await Promise.all([
      queryDatabase(
        `SELECT * FROM customer_view WHERE username = ? AND deleted != 1`,
        [username]
      ),
      queryDatabase(
        `SELECT * FROM employee_view WHERE username = ? AND deleted != 1`,
        [username]
      ),
    ]);

    let data = { token: null };

    const userExists = customer_view.length || employee_view.length;
    if (!userExists) return data;

    const user = customer_view.length ? customer_view[0] : employee_view[0];
    const isValidPassword = await comparePassword(user.password_hash, password);
    if (!isValidPassword) return data;

    queryDatabase(`UPDATE user SET last_login = NOW() WHERE username = ?`, [
      username,
    ]);
    data.token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    return data;
  },
};
