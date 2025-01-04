import React from "react";
import "./AdminDash.css"; // Optional: Create a CSS file for styling

const AdminDash = () => {
  return (
    <div className="admin-dash">
      <h1>Admin Dashboard</h1>
      <p>Manage users, monitor app activity, and configure settings.</p>
      <ul>
        <li>View User Statistics</li>
        <li>Manage Roles and Permissions</li>
        <li>Monitor System Logs</li>
      </ul>
    </div>
  );
};

export default AdminDash;
