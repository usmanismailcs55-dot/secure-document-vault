const documentService = require("../services/documentService");

const uploadDocument = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const file = req.file;

    const document = await documentService.uploadDocument(userId, file);

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
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
