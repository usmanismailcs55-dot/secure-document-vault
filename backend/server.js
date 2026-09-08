require("dotenv").config();

const express = require("express");

const authRoutes = require("./src/routes/authRoutes");
const documentRoutes = require("./src/routes/documentRoutes");
const pool = require("./config/database");

const app = express();

const PORT = process.env.PORT || 5000;

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
pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("✅ Neon database connected!");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
