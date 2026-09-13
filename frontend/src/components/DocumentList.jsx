import React from "react";

function DocumentList({ documents = [], onDownload, onDelete }) {
  if (documents.length === 0) {
    return (
      <div className="document-list-empty">
        <div className="empty-icon">📂</div>
        <h3>No documents yet</h3>
        <p>Upload your first document to see it here.</p>
      </div>
    );
  }

  return (
    <div className="document-list">
      {documents.map((document) => (
        <div className="document-card" key={document.id}>
          <div className="document-icon">📄</div>

          <div className="document-info">
            <h3>{document.original_filename}</h3>

            <p>
              📏 {formatFileSize(document.file_size)}
            </p>

            <p>
              📅{" "}
              {document.created_at
                ? new Date(document.created_at).toLocaleDateString()
                : "Unknown date"}
            </p>
          </div>

          <div className="document-actions">
            <button
              type="button"
              onClick={() => onDownload(document.id)}
              className="download-button"
            >
              📥 Download
            </button>

            <button
              type="button"
              onClick={() => onDelete(document.id)}
              className="delete-button"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatFileSize(bytes) {
  if (!bytes) {
    return "0 Bytes";
  }

  const sizes = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${sizes[index]}`;
}

export default DocumentList;
