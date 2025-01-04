import React from "react";
import "./UserDash.css"; // Optional: Create a CSS file for styling

const UserDash = () => {
  return (
    <div className="user-dash">
      <h1>User Dashboard</h1>
      <p>Manage your account, view orders, and track your deliveries.</p>
      <ul>
        <li>View Order History</li>
        <li>Track Current Deliveries</li>
        <li>Update Account Information</li>
      </ul>
    </div>
  );
};

export default UserDash;
