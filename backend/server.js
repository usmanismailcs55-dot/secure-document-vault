require("dotenv").config();

const express = require("express");

const authRoutes = require("./src/routes/authRoutes");
const documentRoutes = require("./src/routes/documentRoutes");

const app = express();

// 📦 Parse JSON request bodies
app.use(express.json());

// 🔐 Authentication routes
app.use("/api/auth", authRoutes);

// 📄 Document routes
app.use("/api/documents", documentRoutes);

// ❤️ Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// 🗄️ Test database connection
const pool = require("./config/database");

pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("✅ Neon database connected!");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });

module.exports = app;