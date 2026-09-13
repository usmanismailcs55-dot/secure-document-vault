import { useState } from "react";
import api from "../services/api";

function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage("");

      const response = await api.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("📤 Upload response:", response.data);

      setMessage(`✅ "${file.name}" uploaded successfully.`);
      setFile(null);

      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error("❌ Upload error:", error);

      setMessage(
        error.response?.data?.message ||
          "❌ Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Document</h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
        onChange={handleFileChange}
      />

      {file && <p>Selected: {file.name}</p>}

      <button
        type="button"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadForm;
