import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";


const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/auth/profile");
        setProfile(res.data);
      } catch (err) {
        console.log("PROFILE ERROR:", err);
        setError("Unable to load profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-loading">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        {error}
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        <h1>My Profile</h1>

        <p className="profile-subtitle">
          Manage your MessMate account details
        </p>

        {profile ? (
          <div className="profile-details">

            <div className="profile-item">
              <span>Username</span>
              <strong>{profile.username}</strong>
            </div>

            <div className="profile-item">
              <span>Email</span>
              <strong>{profile.email || "Not available"}</strong>
            </div>

            <div className="profile-item">
              <span>User ID</span>
              <strong>#{profile.id}</strong>
            </div>

            <div className="profile-item">
              <span>Member Since</span>
              <strong>MessMate User</strong>
            </div>

          </div>
        ) : (
          <p>No profile data found</p>
        )}

        <button className="edit-profile-btn">
          Edit Profile
        </button>

      </div>
    </div>
  );
};

export default Profile;