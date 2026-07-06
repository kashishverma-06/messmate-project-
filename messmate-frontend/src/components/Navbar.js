import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          MessMate
        </Link>
      </div>

      <div className="nav-right">

        {/* ✅ HOME ADDED BACK */}
        <Link to="/" className="nav-link">
          Home
        </Link>

        {!user && (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>

            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>

            {/* Mess page */}
            <Link to="/messes" className="nav-link">
              Messes
            </Link>

            <Link to="/profile" className="nav-link">
              Profile
            </Link>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;