import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut } from "lucide-react";
import "../styles/navbar.css";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/dashboard">
        <img src={logo} alt="Secure Document Vault" className="logo" />
        <span>Secure Vault</span>
      </Link>

      <div>
        <Link to="/dashboard">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>

        <button onClick={logout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
