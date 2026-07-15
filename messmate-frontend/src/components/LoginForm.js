import React, { useState, useContext } from "react";
import axios from "../axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";


const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      return "Email is required";
    }

    if (!form.password) {
      return "Password is required";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({
      type: "",
      text: "",
    });

    const error = validateForm();

    if (error) {
      setMessage({
        type: "error",
        text: error,
      });
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/auth/login", {
        email: form.email.trim(),
        password: form.password,
      });

      login(res.data.token);

      setMessage({
        type: "success",
        text: "Login successful 🎉 Redirecting...",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Login failed. Please try again.",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <h1>
            🍱 Welcome Back to MessMate
          </h1>

          <p>
            Login to manage your account and explore trusted mess services.
          </p>

        </div>

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />

          </div>


          <div className="form-group">

            <label>Password</label>

            <div className="password-wrapper">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>

          </div>


          <button
            className="auth-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>


          {message.text && (
            <p className={
              message.type === "error"
              ? "error-message"
              : "success-message"
            }>
              {message.text}
            </p>
          )}


          <p className="auth-switch">
            Don't have an account?

            <span onClick={() => navigate("/signup")}>
              Create Account
            </span>

          </p>


        </form>

      </div>

    </div>
  );
};

export default LoginForm;