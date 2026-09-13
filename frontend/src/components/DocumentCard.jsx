import React from "react";

function DocumentCard({ document, onDelete }) {
  return (
    <div className="document-card">
      <h3>{document.original_filename}</h3>

      <button
        type="button"
        onClick={() => onDelete(document.id)}
        className="delete-button"
      >
        🗑️ Delete
      </button>
    </div>
  );
}

export default DocumentCard;