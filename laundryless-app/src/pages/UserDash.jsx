import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const UserDash = () => {
  const [orderDetails, setOrderDetails] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      // Add a new document to the orders collection
      await addDoc(collection(db, "orders"), {
        userId: "dummyUserId", // Replace with actual user ID if available
        orderDetails,
        createdAt: new Date(),
      });

      setSuccessMessage("Order placed successfully!");
      setOrderDetails(""); // Clear the form
    } catch (err) {
      console.error("Error placing order:", err);
      setSuccessMessage("Failed to place order. Try again later.");
    }
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <h2>Place a Dummy Order</h2>
      <form onSubmit={handlePlaceOrder}>
        <label htmlFor="orderDetails">Order Details:</label>
        <textarea
          id="orderDetails"
          value={orderDetails}
          onChange={(e) => setOrderDetails(e.target.value)}
          placeholder="Enter order details..."
          required
          style={{ width: "100%", height: "100px", marginBottom: "1rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Place Order
        </button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default UserDash;
