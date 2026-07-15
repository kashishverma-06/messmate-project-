import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const profileResponse = await axios.get(
          "/api/auth/profile"
        );

        setProfile(profileResponse.data);

        const messResponse = await axios.get(
          "/messes"
        );

        setMesses(messResponse.data);

      } catch (err) {
        console.log("Dashboard Error:", err);

        setError(
          "Unable to load dashboard data."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

  }, []);

  const stats = [
    {
      icon: "🍱",
      title: "Available Messes",
      value: messes.length
    },
    {
      icon: "❤️",
      title: "Favourite Messes",
      value: 0
    },
    {
      icon: "📅",
      title: "Bookings",
      value: 0
    },
    {
      icon: "⭐",
      title: "Reviews",
      value: 0
    }
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        {error}
      </div>
    );
  }

  return (
    <div className="dashboard-container">

      {/* Welcome Section */}
      <section className="welcome-box">
        <div>
          <h1>
            Welcome Back, {profile?.username || "User"} 👋
          </h1>

          <p>
            Find affordable and trusted mess services near you.
          </p>
        </div>

        <button>
          🔍 Find Mess
        </button>
      </section>


      {/* Stats */}
      <section className="stats-container">
        {
          stats.map((item,index)=>(
            <div
              className="stat-card"
              key={index}
            >
              <span>
                {item.icon}
              </span>

              <div>
                <h2>
                  {item.value}
                </h2>

                <p>
                  {item.title}
                </p>
              </div>
            </div>
          ))
        }
      </section>


      {/* Search Section */}
      <section className="search-section">

        <h2>
          Search Mess
        </h2>

        <div className="search-box">

          <input
            type="text"
            placeholder="Enter location..."
          />

          <select>
            <option>
              Food Type
            </option>

            <option>
              Veg
            </option>

            <option>
              Non Veg
            </option>
          </select>

          <select>
            <option>
              Price Range
            </option>

            <option>
              Below ₹2000
            </option>

            <option>
              ₹2000 - ₹3000
            </option>
          </select>

          <button>
            Search
          </button>

        </div>

      </section>


      {/* Dynamic Mess Section */}
      <section className="recommended-section">

        <h2>
          Recommended Messes 🍽️
        </h2>

        <div className="mess-grid">

          {
            messes.length > 0 ? (

              messes.slice(0,3).map((mess)=>(
                <div
                  className="mess-card"
                  key={mess.id}
                >

                  <div className="mess-image">
                    🍛
                  </div>

                  <h3>
                    {mess.name}
                  </h3>

                  <p>
                    📍 {mess.location}
                  </p>

                  <p>
                    💰 ₹{mess.price}/month
                  </p>

                  <p>
                    ⭐ {mess.rating || "No rating"}
                  </p>

                  <button>
                    View Details
                  </button>

                </div>
              ))

            ) : (

              <p>
                No mess available.
              </p>

            )
          }

        </div>

      </section>


      {/* Bottom Section */}
      <div className="bottom-grid">

        <section className="profile-card">

          <div className="avatar">
            👤
          </div>

          <h2>
            {profile?.username || "User"}
          </h2>

          <p>
            Email:
            <br/>
            {profile?.email || "Not Available"}
          </p>

          <button>
            View Profile
          </button>

        </section>


        <section className="activity-card">

          <h2>
            Recent Activity
          </h2>

          <div>
            ❤️ Favourite mess added
          </div>

          <div>
            📅 Booking created
          </div>

          <div>
            ⭐ Review submitted
          </div>

        </section>

      </div>


      {/* Quick Actions */}
      <section className="quick-section">

        <h2>
          Quick Actions
        </h2>

        <div className="quick-grid">

          <button>
            🔍 Find Mess
          </button>

          <button>
            ❤️ Favourite
          </button>

          <button>
            👤 Profile
          </button>

          <button>
            ➕ Add Mess
          </button>

        </div>

      </section>

    </div>
  );
};

export default Dashboard;

/*import React, { useContext, useEffect, useState } from "react";
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

export default Dashboard;*/