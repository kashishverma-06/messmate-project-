import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/auth/profile");

        setProfile(res.data);
      } catch (err) {
        console.log("PROFILE ERROR:", err);
        setError("Failed to fetch profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="profile-container">
      <h2>Profile 👤</h2>

      {profile ? (
        <>
          <p>
            <strong>Username:</strong> {profile.username}
          </p>

          <p>
            <strong>User ID:</strong> {profile.id}
          </p>
        </>
      ) : (
        <p>No profile data found</p>
      )}
    </div>
  );
};

export default Profile;