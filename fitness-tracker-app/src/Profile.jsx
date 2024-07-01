// src/components/Profile.js

import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "", bio: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        setIsEditing(false);
      } else {
        console.error("Error updating profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {isEditing ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Bio:
            <textarea name="bio" value={profile.bio} onChange={handleChange} />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Bio:</strong> {profile.bio}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
