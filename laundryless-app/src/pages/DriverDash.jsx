import React from "react";
import "./DriverDash.css"; // Optional: Create a CSS file for styling

const DriverDash = () => {
  return (
    <div className="driver-dash">
      <h1>Driver Dashboard</h1>
      <p>Access your assigned routes, manage pickups, and update statuses.</p>
      <ul>
        <li>View Assigned Routes</li>
        <li>Update Delivery Status</li>
        <li>Contact Support</li>
      </ul>
    </div>
  );
};

export default DriverDash;
