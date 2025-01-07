import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom"; // 1) Import useNavigate
import "./Navbar.css";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // 2) Create navigate instance

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
      navigate("/"); // 3) Redirect to the main directory
    } catch (error) {
      alert("Error signing out: " + error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
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
            <li>
              <Link to="/adminsignin">
                <button className="auth-button">Admin Sign In</button>
              </Link>
            </li>
            <li>
              <Link to="/adminsignup">
                <button className="auth-button">Admin Sign Up</button>
              </Link>
            </li>
            <li>
              <Link to="/driversignin">
                <button className="auth-button">Driver Sign In</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;