const crypto = require("crypto");
const path = require("path");

const generateSecureFilename = (originalFilename) => {
  const extension = path.extname(originalFilename).toLowerCase();
  const randomName = crypto.randomBytes(32).toString("hex");

  return `${randomName}${extension}`;
};

module.exports = {
  generateSecureFilename,
};