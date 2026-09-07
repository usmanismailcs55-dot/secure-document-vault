const bcrypt = require("bcrypt");
const db = require("../config/database");
const { generateToken } = require("../utils/jwt");

const registerUser = async (email, password) => {
  const passwordHash = await bcrypt.hash(password, 12);

  const result = await db.query(
    `INSERT INTO users (email, password_hash)
     VALUES ($1, $2)
     RETURNING id, email, created_at`,
    [email, passwordHash]
  );

  return result.rows[0];
};

const loginUser = async (email, password) => {
  const result = await db.query(
    `SELECT id, email, password_hash, created_at
     FROM users
     WHERE email = $1`,
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = result.rows[0];

  const passwordMatch = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};