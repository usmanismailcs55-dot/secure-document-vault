const { z } = require("zod");

const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must not exceed 72 characters"),
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .toLowerCase(),

  password: z
    .string()
    .min(1, "Password is required"),
});

module.exports = {
  registerSchema,
  loginSchema,
};