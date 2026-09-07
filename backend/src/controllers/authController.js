const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.registerUser(email, password);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};