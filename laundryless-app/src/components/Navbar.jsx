import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("You have signed out!");
    } catch (error) {
      alert("Error signing out: " + error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Logo</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/admindash">Admin Dashboard</Link>
            </li>
            <li>
              <Link to="/driverdash">Driver Dashboard</Link>
            </li>
            <li>
              <Link to="/userdash">User Dashboard</Link>
            </li>
            <li>
              <button className="auth-button" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin">
                <button className="auth-button">Sign In</button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button className="auth-button">Sign Up</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
