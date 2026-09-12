require("dotenv").config();

const express = require("express");
const logger = require("./src/utils/logger");

const authRoutes = require("./src/routes/authRoutes");
const documentRoutes = require("./src/routes/documentRoutes");
const errorMiddleware = require("./src/middleware/errorMiddleware");
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

// 🚨 Global error handling
app.use(errorMiddleware);

// 🗄️ Test database connection
pool
  .query("SELECT NOW()")
  .then(() => {
    logger.info("Neon database connected!");
  })
  .catch((error) => {
    logger.error("Database connection failed", {
      error: error.message,
    });
  });

// 🚀 Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;
