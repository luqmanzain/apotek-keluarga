import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { BsFillBellFill } from "react-icons/bs";
import { BiLineChart } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineInbox } from "react-icons/ai";
import "./Layout.css";

// Mapping menu sidebar
const sidebarMenus = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    to: "/stock",
    label: "Stock Product",
    icon: <BiLineChart />,
  },
  {
    to: "/transaksi-penjualan",
    label: "Transaksi Penjualan",
    icon: <AiOutlineShoppingCart />,
  },
  {
    to: "/transaksi-pembelian",
    label: "Transaksi Pembelian",
    icon: <AiOutlineInbox />,
  },
  {
    to: "/finance",
    label: "Laporan Transaksi",
    icon: <BsFillBellFill />,
  },
];

const Layout = ({ children, titlePage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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
          {sidebarMenus.map((menu) => (
            <SidebarLink
              key={menu.to}
              to={menu.to}
              icon={menu.icon}
              label={menu.label}
              isSidebarOpen={isSidebarOpen}
              active={location.pathname === menu.to}
            />
          ))}
        </nav>

        {/* Logout button in footer */}
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

// Sidebar link reusable component
const SidebarLink = ({ to, icon, label, isSidebarOpen, active }) => (
  <Link
    to={to}
    className={`sidebar-link text-decoration-none d-flex align-items-center ${
      active ? "active" : ""
    }`}
  >
    <span className="icon">{icon}</span>
    {isSidebarOpen && <span className="ms-2">{label}</span>}
  </Link>
);

export default Layout;
