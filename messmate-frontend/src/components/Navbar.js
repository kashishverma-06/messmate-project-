import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    logout();

    toast.success("Logged out successfully 👋");

    navigate("/login");

    closeMenu();
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="nav-left">
        <NavLink
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          🍱 MessMate
        </NavLink>
      </div>

      {/* MOBILE BUTTON */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* NAV LINKS */}
      <div
        className={`nav-right ${menuOpen ? "active" : ""}`}
      >

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
          onClick={closeMenu}
        >
          Home
        </NavLink>

        {!user && (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={closeMenu}
            >
              Login
            </NavLink>

            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={closeMenu}
            >
              Signup
            </NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={closeMenu}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/messes"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={closeMenu}
            >
              Messes
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={closeMenu}
            >
              Profile
            </NavLink>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;