import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AdminDash from "./pages/AdminDash";
import DriverDash from "./pages/DriverDash";
import UserDash from "./pages/UserDash";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import AccountSettings from "./components/authentication/AccountSettings";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admindash" element={<AdminDash />} />
        <Route path="/driverdash" element={<DriverDash />} />
        <Route path="/userdash" element={<UserDash />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<AccountSettings />} />
      </Routes>
    </Router>
  );
};

export default App;
