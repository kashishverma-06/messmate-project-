import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert("Registration successful 🎉 Please login");

      setForm({ username: "", password: "" });

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="auth-btn" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p
          className="auth-link"
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer" }}
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};

export default SignupForm;