import React from "react";

function SuccessMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="success-message" role="alert">
      <span className="success-icon">✓</span>

      <span className="success-text">
        {message}
      </span>
    </div>
  );
}

export default SuccessMessage;