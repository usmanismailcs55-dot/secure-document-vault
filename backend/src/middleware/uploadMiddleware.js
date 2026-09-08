const multer = require("multer");
const crypto = require("crypto");

const allowedMimeTypes = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const randomName = crypto.randomBytes(32).toString("hex");
    cb(null, randomName);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

module.exports = upload;