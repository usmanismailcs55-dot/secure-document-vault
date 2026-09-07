const express = require("express");

const documentController = require("../controllers/documentController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authenticateToken);

router.post("/upload", documentController.upload);

router.get("/", documentController.list);

router.get("/:id/download", documentController.download);

router.delete("/:id", documentController.delete);

module.exports = router;