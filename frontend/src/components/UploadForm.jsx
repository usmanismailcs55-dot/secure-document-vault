import { useState } from "react";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage("");
  };

  const handleUpload = () => {
    if (!file) return;

    setMessage(`"${file.name}" is ready to upload.`);
    console.log("File ready to upload:", file);
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
        disabled={!file}
      >
        Upload
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadForm;