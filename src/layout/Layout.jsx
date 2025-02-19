import React, { useState } from "react";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { BsFillBellFill, BsFillHeartFill } from "react-icons/bs";
import { BiLineChart } from "react-icons/bi";
import "./Layout.css";
import { Link } from "react-router-dom";

const Layout = ({ children, titlePage }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`layout ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="top-section">
          <div className="logo">
            {isOpen ? (
              <span className="logo-text">Apotek Keluarga</span>
            ) : (
              <span className="logo-text">AK</span>
            )}
          </div>
          <FaBars className="toggle-btn" onClick={toggleSidebar} />
        </div>

        <div className="menu">


          <div className="menu-item active">
            <Link to="/dashboard" className="text-decoration-none text-dark">
              <MdDashboard className="icon" />
              {isOpen && <span>Dashboard</span>}
            </Link>
          </div>

          <div className="menu-item">
            <Link to="/stock" className="text-decoration-none text-dark">
              <BiLineChart className="icon" />
              {isOpen && <span>Stock</span>}
            </Link>
          </div>

          <div className="menu-item">
            <Link to="/finance" className="text-decoration-none text-dark">
              <BsFillBellFill className="icon" />
              {isOpen && <span>Laporan Transaksi</span>}
            </Link>
          </div>

        </div>

        <div className="bottom-section">
          <div className="menu-item">
            <FiLogOut className="icon" />
            {isOpen && <span>Logout</span>}
          </div>

          <div className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? <FaSun className="icon" /> : <FaMoon className="icon" />}
            {isOpen && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>{titlePage}</h1>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
