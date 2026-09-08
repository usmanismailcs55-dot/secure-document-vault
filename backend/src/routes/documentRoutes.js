const express = require("express");

const documentController = require("../controllers/documentController");
const authenticateToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// 🔐 Protect all document routes
router.use(authenticateToken);

// 📤 Upload document
router.post(
  "/upload",
  upload.single("file"),
  documentController.uploadDocument
);

// 📋 List documents
router.get("/", documentController.listDocuments);

// 📥 Download document
router.get("/:id/download", documentController.downloadDocument);

// 🗑️ Delete document
router.delete("/:id", documentController.deleteDocument);

module.exports = router;