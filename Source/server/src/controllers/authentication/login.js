import jwt from "jsonwebtoken";
import queryDatabase from "../../utils/queryDatabase.js";

// No bcrypt for simplicity
const comparePassword = async (password1, password2) => {
  return await (password1 === password2);
};

export default {
  post: async (req, res) => {
    const { email, password } = req.body;
    const [customer_view, employee_view] = await Promise.all([
      queryDatabase(`SELECT * FROM customer_view WHERE email = ?`, [email]),
      queryDatabase(`SELECT * FROM employee_view WHERE email = ?`, [email]),
    ]);

    let token;
    if (customer_view.length === 0 && employee_view.length === 0) {
      token = null;
    } else {
      const user = customer_view.length ? customer_view[0] : employee_view[0];
      const isValidPassword = await comparePassword(
        user.password_hash,
        password
      );
      token = isValidPassword
        ? jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
          })
        : null;
    }
    return { token };
  },
};
