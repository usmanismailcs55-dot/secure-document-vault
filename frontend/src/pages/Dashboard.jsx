import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";
import DocumentList from "../components/DocumentList";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1>Secure Document Vault</h1>
        <p>Welcome to your dashboard.</p>

        <UploadForm />

        <DocumentList />
      </div>
    </>
  );
}

export default Dashboard;
