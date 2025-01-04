// src/components/AccountSettings.jsx
import React, { useState } from "react";
import { auth } from "../../firebase";
import { updatePassword, updateEmail } from "firebase/auth";

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
    <div>
      <h2>Account Settings</h2>
      <div>
        <label>Update Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleUpdateEmail}>Update Email</button>
      </div>
      <div>
        <label>Update Password</label>
        <input
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
