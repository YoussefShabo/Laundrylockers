import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AdminDash from "./pages/AdminDash";
import DriverDash from "./pages/DriverDash";
import UserDash from "./pages/UserDash";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import AccountSettings from "./components/authentication/AccountSettings";
import AdminSignUp from "./components/authentication/AdminSignUp";
import AdminSignIn from "./components/authentication/AdminSignIn";
import RoleRoute from "./components/RoleRoute";
import DriverSignIn from "./components/authentication/DriverSignIn";
import Footer from "./components/Footer";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [isNewUser, setIsNewUser] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`app-container ${theme}`}>
      <Router>
        <Navbar />
        <button onClick={toggleTheme}>Change Theme</button>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/adminsignup" element={<AdminSignUp />} />
          <Route path="/adminsignin" element={<AdminSignIn />} />
          <Route
            path="/admindash"
            element={
              <RoleRoute role="admin">
                <AdminDash />
              </RoleRoute>
            }
          />
          <Route path="/driversignin" element={<DriverSignIn />} />
          <Route path="/driverdash" element={<DriverDash />} />
          <Route path="/userdash" element={<UserDash toggleTheme={toggleTheme} currentTheme={theme} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<AccountSettings toggleTheme={toggleTheme} currentTheme={theme} />} />
        </Routes>
        <Footer />
        <AuthListener setIsNewUser={setIsNewUser} />
      </Router>
    </div>
  );
};

const AuthListener = ({ setIsNewUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.metadata.creationTime === user.metadata.lastSignInTime) {
        setIsNewUser(true);
      }
    });
    return () => unsubscribe();
  }, [navigate, setIsNewUser]);

  return null;
};

export default App;