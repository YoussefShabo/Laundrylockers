import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import "./DriverDash.css";

const DriverDash = () => {
  const [orders, setOrders] = useState([]);
  const [newOrderAlert, setNewOrderAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const driverId = "bgTv4kIMXfZJhEvvfuCbsH54yOx1"; // Replace with authenticated driver's ID

  useEffect(() => {
    // Query the 'orders' collection for orders assigned to this driver
    const q = query(
      collection(db, "orders"),
      where("assignedDriverId", "==", driverId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id, // Document ID
        assignedDriverId: doc.data().assignedDriverId, // Driver ID
        orderDetails: doc.data().orderDetails, // Order details
        createdAt: doc.data().createdAt, // Timestamp
        userId: doc.data().userId, // User ID
      }));

      // Check for new orders
      if (fetchedOrders.length > orders.length) {
        setNewOrderAlert(true); // Trigger new order alert
        setTimeout(() => setNewOrderAlert(false), 5000); // Reset alert after 5 seconds
      }

      setOrders(fetchedOrders);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [driverId, orders]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="DriverDash">
      <h1>Driver Dashboard</h1>
      <p>Access your assigned routes, manage pickups, and update statuses.</p>

      {/* Notification for New Orders */}
      {newOrderAlert && <div className="alert">New Order Assigned!</div>}

      <h2>Your Assigned Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <strong>Order ID:</strong> {order.id} <br />
              <strong>Details:</strong> {order.orderDetails} <br />
              <strong>User ID:</strong> {order.userId} <br />
              <strong>Created At:</strong>{" "}
              {order.createdAt?.toDate().toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders assigned to you at the moment.</p>
      )}

      <div className="full"></div>
    </div>
  );
};

export default DriverDash;
