import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChevronRight,
  FaChevronLeft,
  FaUserEdit,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { BsFillBellFill } from "react-icons/bs";
import { BiLineChart } from "react-icons/bi";
import "./Layout.css";

const Layout = ({ children, titlePage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="layout-wrapper">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="logo">{isSidebarOpen ? "Apotek Keluarga" : "AK"}</div>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        <nav className="sidebar-menu">
          <SidebarLink to="/dashboard" icon={<MdDashboard />} label="Dashboard" isSidebarOpen={isSidebarOpen} />
          <SidebarLink to="/stock" icon={<BiLineChart />} label="Stock" isSidebarOpen={isSidebarOpen} />
          <SidebarLink to="/finance" icon={<BsFillBellFill />} label="Laporan Transaksi" isSidebarOpen={isSidebarOpen} />
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut />
            {isSidebarOpen && <span className="ms-2">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h3 className="page-title">{titlePage}</h3>

          {/* Profile shortcut (no dropdown) */}
          <Link
            to="/edit-profile"
            className="profile-quicklink d-flex align-items-center gap-2 text-decoration-none text-dark"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Avatar"
              className="avatar rounded-circle"
            />
            <span className="fw-semibold d-none d-md-inline">Admin</span>
          </Link>
        </header>

        <hr />
        <section className="content-area">{children}</section>
      </main>
    </div>
  );
};

// Reusable sidebar link component
const SidebarLink = ({ to, icon, label, isSidebarOpen }) => (
  <Link to={to} className="sidebar-link text-decoration-none text-dark d-flex align-items-center">
    <span className="icon">{icon}</span>
    {isSidebarOpen && <span className="ms-2">{label}</span>}
  </Link>
);

export default Layout;
