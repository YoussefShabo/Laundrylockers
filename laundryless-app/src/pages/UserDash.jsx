import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./UserDash.css";
import AccountSettings from "../components/authentication/AccountSettings";

const UserDash = () => {
  const [activeTab, setActiveTab] = useState("placeOrder");
  const [orderDetails, setOrderDetails] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [orders, setOrders] = useState([]);

  // Store the current user data
  const [currentUser, setCurrentUser] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch orders whenever the user is on "viewOrders" tab
  useEffect(() => {
    if (activeTab === "viewOrders" && currentUser) {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, currentUser]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      setErrorMessage("You must be logged in to place an order.");
      return;
    }

    try {
      // Create a new document in "orders" collection
      console.log("Current User:");
      console.log(currentUser);
      console.log(currentUser.uid);
      await addDoc(collection(db, "orders"), {
        createdBy: currentUser.displayName, // User's unique ID
        orderDetails,
        createdAt: new Date(),
      });
      setSuccessMessage("Order placed successfully!");
      setErrorMessage("");
      setOrderDetails("");
    } catch (err) {
      console.error("Error placing order:", err);
      setSuccessMessage("");
      setErrorMessage("Failed to place order. Try again later.");
    }
  };

  // Fetch all orders that this specific user created
  const fetchOrders = async () => {
    try {
      // Only query orders created by the currently logged in user
      const q = query(
        collection(db, "orders"),
        where("createdBy", "==", currentUser.displayName)
      );
      const querySnapshot = await getDocs(q);
      const ordersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "placeOrder":
        return (
          <div>
            <h2>Place a Dummy Order</h2>
            <form onSubmit={handlePlaceOrder}>
              <label htmlFor="orderDetails">Order Details:</label>
              <textarea
                id="orderDetails"
                value={orderDetails}
                onChange={(e) => setOrderDetails(e.target.value)}
                placeholder="Enter order details..."
                required
              />
              <button type="submit">Place Order</button>
            </form>
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        );

      case "viewOrders":
        return (
          <div>
            <h2>Your Orders</h2>
            {orders.length > 0 ? (
              <ul>
                {orders.map((order) => (
                  <li key={order.id}>
                    <strong>Order ID:</strong> {order.id} <br />
                    <strong>Details:</strong> {order.orderDetails} <br />
                    <strong>Placed On:</strong>{" "}
                    {order.createdAt.toDate().toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        );

      case "profileSettings":
        return (
          <div>
            <AccountSettings />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dash-container">
      <h1>User Dashboard</h1>

      {/* Secondary Navbar */}
      <nav className="secondary-navbar">
        <button
          className={`nav-button ${
            activeTab === "placeOrder" ? "active-nav-button" : ""
          }`}
          onClick={() => setActiveTab("placeOrder")}
        >
          Place Order
        </button>
        <button
          className={`nav-button ${
            activeTab === "viewOrders" ? "active-nav-button" : ""
          }`}
          onClick={() => setActiveTab("viewOrders")}
        >
          View Orders
        </button>
        <button
          className={`nav-button ${
            activeTab === "profileSettings" ? "active-nav-button" : ""
          }`}
          onClick={() => setActiveTab("profileSettings")}
        >
          Profile Settings
        </button>
      </nav>

      {/* Content Based on Active Tab */}
      <div className="content-container">{renderContent()}</div>
    </div>
  );
};

export default UserDash;
