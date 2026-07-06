import React, { useState } from "react";
import api from "../services/api";
import "./Mess.css";

function AddMessForm({ onMessAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await api.post("/messes", {
        name: formData.name,
        location: formData.location,
        price: parseInt(formData.price),
      });

      setMessage("Mess added successfully! 🎉");

      setTimeout(() => setMessage(""), 3000);

      setFormData({ name: "", location: "", price: "" });

      if (onMessAdded) onMessAdded(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add mess. Try again."
      );

      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="mess-form-container">
      <div className="mess-form-card">
        <h2 className="form-title">Add New Mess</h2>

        <form onSubmit={handleSubmit} className="mess-form">
          <div className="form-group">
            <label>Mess Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter mess name"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Monthly Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Mess
          </button>
        </form>

        {message && <div className="success-msg">{message}</div>}
        {error && <div className="error-msg">{error}</div>}
      </div>
    </div>
  );
}

export default AddMessForm;