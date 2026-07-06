import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  return (
    <div className="dashboard-container">
      <h1>Welcome to Dashboard 🚀</h1>

      {user && (
        <div>
          <p><strong>Username:</strong> {user.username || "N/A"}</p>
        </div>
      )}

      <p>
        <strong>Token:</strong>{" "}
        {token ? token.slice(0, 20) + "..." : "No token found"}
      </p>

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;