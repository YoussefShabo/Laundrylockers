import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar, setShowModal }) => {
  return (
    <div className={`Sidebar ${isOpen ? "open" : "collapsed"}`}>
      <button className="burger-button" onClick={toggleSidebar}>
        ☰
      </button>
      {isOpen && (
        <>
          <h2>Admin Menu</h2>
          <ul>
            <li>
              <p>Orders</p>
              <ul>
                <li><Link to="/admin/orders/pending">Pending Orders</Link></li>
                <li><Link to="/admin/orders/completed">Completed Orders</Link></li>
              </ul>
            </li>
            <li>
              <p>Customers</p>
              <ul>
                <li><Link to="/admin/customers/new">New Customers</Link></li>
                <li><Link to="/admin/customers/loyal">Loyal Customers</Link></li>
              </ul>
            </li>
            <li><Link to="/admin/admins">Admins</Link></li>
            <li><Link to="/admin/drivers">Drivers</Link></li>
            <li><Link to="/admin/employees">Employees</Link></li>
            <li><button onClick={() => setShowModal(true)} className="add-user-button">
              Add Employee
            </button></li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;