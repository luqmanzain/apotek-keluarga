import React, { useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import "./EditProfile.css";
import Layout from "../../layout/layout";

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );
  const [name, setName] = useState("John Doe");
  const [password, setPassword] = useState("hayooo");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(75);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Profile updated successfully!");
    }, 2000);
  };

  return (
    <Layout titlePage="Edit Profile">
      <div className="profile-container container">
        <h2 className="mb-4 text-center">Edit Profile</h2>

        {/* Profile Image Section */}
        <div className="profile-picture">
          <img src={profileImage} alt="Profile" className="profile-img" />
          <label className="upload-btn">
            <BsFillCameraFill />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <span>Profile Completion: {progress}%</span>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Form Section */}
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {/* Buttons */}
        <div className="btn-container">
          <Link to="/dashboard" className="btn btn-secondary">Cancel</Link>
          <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
