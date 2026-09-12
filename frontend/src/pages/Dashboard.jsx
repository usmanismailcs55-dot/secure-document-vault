import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1>Secure Document Vault</h1>
        <p>Welcome to your dashboard.</p>
      </div>
    </>
  );
}

export default Dashboard;