import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "./Mess.css";

function MessCard({ mess, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
  });

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

  const handleUpdate = async () => {
    if (!formData.name.trim() || !formData.location.trim() || !formData.price) {
      toast.error("All fields are required!");
      return;
    }

    if (Number(formData.price) <= 0) {
      toast.error("Price must be greater than zero!");
      return;
    }

    try {
      setLoading(true);

      await onEdit(mess.id, {
        name: formData.name.trim(),
        location: formData.location.trim(),
        price: Number(formData.price),
      });

      toast.success("Mess updated successfully 🎉");

      setIsEditing(false);

    } catch (error) {
      toast.error("Failed to update mess");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mess?"
    );

    if (confirmDelete) {
      onDelete(mess.id);
      toast.success("Mess deleted successfully 🗑️");
    }

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
            placeholder="Monthly Price"
            className="form-input"
          />

          <div className="btn-group">

            <button
              onClick={handleUpdate}
              className="save-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
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

          <div className="mess-icon">
            🍱
          </div>

          <h3>{mess.name}</h3>

          <p>
            📍 {mess.location}
          </p>

          <p className="price">
            ₹{Number(mess.price).toLocaleString("en-IN")}/month
          </p>


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