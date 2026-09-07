require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

const pool = require("./config/database");

pool.query("SELECT NOW()")
  .then(() => {
    console.log("✅ Neon database connected!");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });