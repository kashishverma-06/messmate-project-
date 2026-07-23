import React, { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Auth.css";

const SignupForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!form.username.trim()) {
      return "Username is required";
    }

    if (form.username.trim().length < 3) {
      return "Username must contain minimum 3 characters";
    }

    if (!form.email.trim()) {
      return "Email is required";
    }
   

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email)) {
      return "Please enter a valid email";
    }

    if (form.password.length < 6) {
      return "Password must contain minimum 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();

    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      await axios.post("/auth/register", {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
         
      });

      toast.success("Account created successfully 🎉");

      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
       
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <h1>
            🍱 Join MessMate Today
          </h1>

          <p>
            Create your account and discover affordable,
            hygienic and trusted mess services near you.
          </p>

        </div>

        <form 
          className="auth-form" 
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>Username</label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email address"
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
                placeholder="Create password"
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

          <div className="form-group">

            <label>Confirm Password</label>

            <div className="password-wrapper">

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>

            </div>

          </div>

          <div className="form-group">

</div>

          <button 
            className="auth-btn" 
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="auth-switch">
            Already have an account?

            <span onClick={() => navigate("/login")}>
              Login
            </span>

          </p>

        </form>

      </div>

    </div>
  );
};

export default SignupForm;