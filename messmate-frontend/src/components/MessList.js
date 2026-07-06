import React, { useEffect, useState } from "react";
import api from "../services/api";
import LoadingSpinner from "./LoadingSpinner";
import MessCard from "./MessCard";

function MessList({ refresh }) {
  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");

  // ================= FETCH =================
  useEffect(() => {
    const fetchMesses = async () => {
      try {
        setLoading(true);
        setError("");

        const url = location
          ? `/messes?location=${encodeURIComponent(location)}`
          : "/messes";

        const res = await api.get(url);

        console.log("MESS DATA:", res.data); // debug

        setMesses(res.data);
      } catch (err) {
        console.log("FETCH ERROR:", err.response || err);
        setError("Failed to load mess data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMesses();
  }, [location, refresh]);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await api.delete(`/messes/${id}`);
      setMesses((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  // ================= EDIT =================
  const handleEdit = async (id, data) => {
    try {
      const res = await api.put(`/messes/${id}`, data);

      setMesses((prev) =>
        prev.map((m) =>
          m.id === id ? (res.data.mess ? res.data.mess : res.data) : m
        )
      );
    } catch (err) {
      console.log("EDIT ERROR:", err);
    }
  };

  // ================= LOADING / ERROR =================
  if (loading) return <LoadingSpinner />;

  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div className="mess-list-container">
      <h2>Mess Listings 🍛</h2>

      {/* FILTER */}
      <select
        className="form-select"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="">All Locations</option>
        <option value="Indore">Indore</option>
        <option value="Bhopal">Bhopal</option>
        <option value="Khandwa">Khandwa</option>
        <option value="Ujjain">Ujjain</option>
      </select>

      {/* COUNT */}
      <p>Total Messes: {messes.length}</p>

      {/* LIST */}
      <div className="card-container">
        {messes.length === 0 ? (
          <p>No mess found 😕</p>
        ) : (
          messes.map((mess) => (
            <MessCard
              key={mess.id}
              mess={mess}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MessList;