import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/signup">Signup</Link>}
      {user && <Link to="/dashboard">Dashboard</Link>}
      {user && <Link to="/profile">Profile</Link>}
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
};

export default Navbar;