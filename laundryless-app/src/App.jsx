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
import AdminSignUp from "./components/authentication/AdminSignUp";
import AdminSignIn from "./components/authentication/AdminSignIn";
import RoleRoute from "./components/RoleRoute";
import DriverSignIn from "./components/authentication/DriverSignIn";

const App = () => {
  return (
    <Router>
      <Navbar />
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
        <Route path="/userdash" element={<UserDash />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<AccountSettings />} />
      </Routes>
    </Router>
  );
};

export default App;
