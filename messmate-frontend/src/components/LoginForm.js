import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import "../App.css";

const LoginForm = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/auth/login', form);
      login(res.data.token);
      alert('Login successful');
    } catch (err) {
      alert('Invalid credentials');
    }
  };




return (
  <div className="auth-container">
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Welcome Back</h2>

      <div className="input-group">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>

      <button className="auth-btn" type="submit">
        Login
      </button>

      <p className="auth-link">
        Don't have an account? Register
      </p>
    </form>
  </div>
);
};

export default LoginForm;