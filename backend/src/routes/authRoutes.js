const express = require("express");
const authController = require("../controllers/authController");
const validate = require("../middleware/validationMiddleware");
const { registerSchema } = require("../validation/authValidation");

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  authController.register
);
router.post("/login", authController.login);

module.exports = router;