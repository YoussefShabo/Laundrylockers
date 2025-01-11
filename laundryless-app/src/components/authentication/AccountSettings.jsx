import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { updatePassword, updateEmail, updateProfile } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import "./AccountSettings.css";

const AccountSettings = ({ toggleTheme, currentTheme }) => {
  const [email, setEmail] = useState(auth.currentUser?.email || "");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDocRef = doc(db, "customers", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userProfile = userDoc.data();
          setAddress(userProfile.address || "");
          setAddress2(userProfile.address2 || "");
          setCity(userProfile.city || "");
          setState(userProfile.state || "");
          setZipCode(userProfile.zipCode || "");
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const setProfile = async () => {
    try {
      await updateProfile(auth.currentUser, email);
      alert("User Name updated successfully!");
    } catch (error) {
      console.error("Error updating User Name:", error);
      alert(error.message);
    }
  };
  const handleUpdateEmail = async () => {
    try {
      await updateEmail(auth.currentUser, email);
      alert("Email updated successfully!");
    } catch (error) {
      console.error("Error updating email:", error);
      alert(error.message);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await updatePassword(auth.currentUser, password);
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      alert(error.message);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const userDocRef = doc(db, "customers", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        address,
        address2,
        city,
        state,
        zipCode,
      });
      alert("Profile updated successfully!");
      // Redirect to User Dashboard and directly to the "Place Order" page
      navigate("/userdash");
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message);
    }
  };

  return (
    <div className={`AccountSettings ${currentTheme}`}>
      <button className="theme-toggle-button" onClick={toggleTheme}>Change Theme</button>
      <div className="settings-section">
        <label htmlFor="displayName">Update User Name</label>
        <input
          id="displayName"
          name="displayName"
          className="input-field"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <button onClick={setProfile}>Update User Name</button>
      </div>
      <div className="settings-section">
        <label htmlFor="email">Update Email</label>
        <input
          id="email"
          name="email"
          className="input-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleUpdateEmail}>Update Email</button>
      </div>
      <div className="settings-section">
        <label htmlFor="password">Update Password</label>
        <input
          id="password"
          name="password"
          className="input-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleUpdatePassword}>Update Password</button>
      </div>
      <div className="settings-section">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          className="input-field"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="settings-section">
        <label htmlFor="address2">Address 2</label>
        <input
          id="address2"
          name="address2"
          className="input-field"
          type="text"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
      </div>
      <div className="settings-section">
        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          className="input-field"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="settings-section">
        <label htmlFor="state">State</label>
        <input
          id="state"
          name="state"
          className="input-field"
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <div className="settings-section">
        <label htmlFor="zipCode">Zip Code</label>
        <input
          id="zipCode"
          name="zipCode"
          className="input-field"
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>
      <button onClick={handleSaveProfile}>Save Profile</button>
    </div>
  );
};

export default AccountSettings;