import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../axiosConfig";
import "../App.css";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/auth/profile");
        setProfile(res.data);
      } catch (err) {
        console.log("Profile Error:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">

        <h1>Welcome to Dashboard 🚀</h1>

        <div className="user-info">
          <p>
            <strong>Username:</strong>{" "}
            {profile?.username || "Loading..."}
          </p>

          <p>
            <strong>User ID:</strong>{" "}
            {profile?.id || "Loading..."}
          </p>
        </div>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>

      </div>
    </div>
  );
};

export default Dashboard;