import React, { useState } from "react";
import { auth } from "../../firebase";
import { updatePassword, updateEmail } from "firebase/auth";
import "./AccountSettings.css";

const AccountSettings = () => {
  const [email, setEmail] = useState(auth.currentUser?.email || "");
  const [password, setPassword] = useState("");

  const handleUpdateEmail = async () => {
    try {
      await updateEmail(auth.currentUser, email);
      alert("Email updated successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await updatePassword(auth.currentUser, password);
      alert("Password updated successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={`AccountSettings ${theme}`}>
      {/* <button className="theme-toggle-button" onClick={toggleTheme}>Change Theme</button> */}
      <div className="settings-section">
        <label>Update Email</label>
        <input className="input-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleUpdateEmail}>Update Email</button>
      </div>
      <div className="settings-section">
        <label>Update Password</label>
        <input className="input-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleUpdatePassword}>Update Password</button>
      </div>
    </div>
  );
};

export default AccountSettings;