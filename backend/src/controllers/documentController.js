const documentService = require("../services/documentService");
const fs = require("fs/promises");

const uploadDocument = async (req, res, next) => {
  let filePath;

  try {
    const userId = req.user.id;
    const file = req.file;

    // Make sure a file was actually uploaded
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Save the uploaded file path
    filePath = file.path;

    // Store document information in the database
    const document = await documentService.uploadDocument(userId, file);

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    // If database/storage processing fails,
    // remove the physical uploaded file
    if (filePath) {
      try {
        await fs.unlink(filePath);
      } catch (deleteError) {
        console.error("Failed to delete uploaded file:", deleteError);
      }
    }

    next(error);
  }
};

const listDocuments = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const documents = await documentService.getUserDocuments(userId);

    res.status(200).json({
      success: true,
      documents,
    });
  } catch (error) {
    next(error);
  }
};

const downloadDocument = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const documentId = req.params.id;

    const document = await documentService.getDocumentForDownload(
      userId,
      documentId
    );

    res.download(
      document.file_path,
      document.original_filename,
      (error) => {
        if (error) {
          next(error);
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

const deleteDocument = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const documentId = req.params.id;

    await documentService.deleteDocument(userId, documentId);

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadDocument,
  listDocuments,
  downloadDocument,
  deleteDocument,
};
