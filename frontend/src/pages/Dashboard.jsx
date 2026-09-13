import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";
import DocumentList from "../components/DocumentList";
import { getDocuments } from "../services/documentService";
import api from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error("Failed to load documents:", error);
    }
  };

  const handleView = async (documentId) => {
    try {
      const response = await api.get(
        `/documents/${documentId}/download`,
        {
          responseType: "blob",
        }
      );

      const fileURL = URL.createObjectURL(response.data);

      window.open(fileURL, "_blank");

      setTimeout(() => {
        URL.revokeObjectURL(fileURL);
      }, 60000);
    } catch (error) {
      console.error("❌ View document error:", error);
    }
  };

  const handleDownload = (documentId) => {
    console.log("📥 Download document:", documentId);
  };

  const handleDelete = (documentId) => {
    console.log("🗑️ Delete document:", documentId);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1>Secure Document Vault</h1>
        <p>Welcome to your dashboard.</p>

        <UploadForm onUploadSuccess={loadDocuments} />

        <DocumentList
          documents={documents}
          onView={handleView}
          onDownload={handleDownload}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default Dashboard;
