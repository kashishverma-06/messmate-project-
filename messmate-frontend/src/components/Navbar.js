import React, { useContext , useState } from "react";
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

  const [menuOpen , setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          MessMate
        </Link>
      </div>

      <div
      className = "hamburger"
      onClick={() => setMenuOpen(!menuOpen)}
      > 
      {menuOpen ? "✖" : "☰"}
      </div>

      <div className={ `nav-right ${menuOpen ? "active " : "" }`}>

        {/* ✅ HOME ADDED BACK */}
        <Link to="/" className="nav-link"
        onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        {!user && (
          <>
            <Link to="/login" className="nav-link"
            onClick={() => setMenuOpen(false)}>
              Login
            </Link>

            <Link to="/signup" className="nav-link"
            onClick={() => setMenuOpen(false)}>
              Signup
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/dashboard" className="nav-link"
            onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>

            {/* Mess page */}
            <Link to="/messes" className="nav-link"
            onClick={() => setMenuOpen(false)}>
              Messes
            </Link>

            <Link to="/profile" className="nav-link"
            onClick={() => setMenuOpen(false)}>
              Profile
            </Link>

            <button className="logout-btn" onClick={() => {handleLogout(); setMenuOpen(false);
            }
            }>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;