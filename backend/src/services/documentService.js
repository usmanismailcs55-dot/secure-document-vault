const db = require("../../config/database");

const uploadDocument = async (userId, file) => {
  if (!file) {
    throw new Error("No file uploaded");
  }

  const result = await db.query(
    `INSERT INTO documents (
       owner_id,
       original_filename,
       stored_filename,
       file_path,
       mime_type,
       file_size
     )
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      userId,
      file.originalname,
      file.filename,
      file.path,
      file.mimetype,
      file.size,
    ]
  );

  return result.rows[0];
};

const getUserDocuments = async (userId) => {
  const result = await db.query(
    `SELECT
       id,
       original_filename,
       stored_filename,
       mime_type,
       file_size,
       created_at
     FROM documents
     WHERE owner_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};

const getDocumentForDownload = async (userId, documentId) => {
  const result = await db.query(
    `SELECT *
     FROM documents
     WHERE id = $1
       AND owner_id = $2`,
    [documentId, userId]
  );

  if (result.rows.length === 0) {
    throw new Error("Document not found");
  }

  return result.rows[0];
};

const deleteDocument = async (userId, documentId) => {
  const result = await db.query(
    `DELETE FROM documents
     WHERE id = $1
       AND owner_id = $2
     RETURNING *`,
    [documentId, userId]
  );

  if (result.rows.length === 0) {
    throw new Error("Document not found");
  }

  return result.rows[0];
};

module.exports = {
  uploadDocument,
  getUserDocuments,
  getDocumentForDownload,
  deleteDocument,
};
