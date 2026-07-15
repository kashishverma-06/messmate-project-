import React, { useState } from "react";
import axios from "../axiosConfig";
import "./Mess.css";

function AddMessForm({ onMessAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Mess name is required";
    }

    if (!formData.location.trim()) {
      return "Location is required";
    }

    if (!formData.price) {
      return "Price is required";
    }

    if (Number(formData.price) <= 0) {
      return "Price must be greater than zero";
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

      const response = await axios.post("/messes", {
        name: formData.name.trim(),
        location: formData.location.trim(),
        price: Number(formData.price),
      });

      setMessage({
        type: "success",
        text: "Mess added successfully 🎉",
      });

      setFormData({
        name: "",
        location: "",
        price: "",
      });

      if (onMessAdded) {
        onMessAdded(response.data);
      }

      setTimeout(() => {
        setMessage({
          type: "",
          text: "",
        });
      }, 3000);

    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Failed to add mess. Try again.",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mess-form-container">
      <div className="mess-form-card">

        <div className="form-header">
          <h2>🍱 Add New Mess</h2>
          <p>Register your mess and reach more students.</p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="mess-form"
        >

          <div className="form-group">
            <label>Mess Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter mess name"
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
              placeholder="Example: 2500"
              className="form-input"
            />
          </div>


          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Mess"}
          </button>

        </form>


        {message.text && (
          <div
            className={
              message.type === "success"
              ? "success-msg"
              : "error-msg"
            }
          >
            {message.text}
          </div>
        )}

      </div>
    </div>
  );
}

export default AddMessForm;