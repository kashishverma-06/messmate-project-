import React, { useState, useEffect } from "react";
import "./Mess.css";

function MessCard({ mess, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
  });

  // sync prop → state safely
  useEffect(() => {
    setFormData({
      name: mess.name || "",
      location: mess.location || "",
      price: mess.price || "",
    });
  }, [mess]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE
  const handleUpdate = () => {
    if (!formData.name || !formData.location || !formData.price) {
      alert("All fields are required!");
      return;
    }

    onEdit(mess.id, {
      ...formData,
      price: Number(formData.price),
    });

    setIsEditing(false);
  };

  // DELETE
  const handleDelete = () => {
    onDelete(mess.id);
  };

  return (
    <div className="mess-card">
      {isEditing ? (
        <div className="mess-edit-form">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Mess Name"
            className="form-input"
          />

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="form-input"
          />

          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="form-input"
          />

          <div className="btn-group">
            <button onClick={handleUpdate} className="save-btn">
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mess-view">
          <h3>{mess.name}</h3>
          <p>📍 {mess.location}</p>
          <p className="price">₹{mess.price}/month</p>

          <div className="btn-group">
            <button
              onClick={() => setIsEditing(true)}
              className="edit-btn"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessCard;