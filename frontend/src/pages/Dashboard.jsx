import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1>Secure Document Vault</h1>
        <p>Welcome to your dashboard.</p>

        <UploadForm />
      </div>
    </>
  );
}

export default Dashboard;