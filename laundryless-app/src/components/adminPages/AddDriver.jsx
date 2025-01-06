import React, { useState } from "react";
import { db, auth } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AddDriver = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddDriver = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Create the driver's Firebase authentication account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      // Add the driver to the Firestore "users" collection with the "driver" role
      await setDoc(doc(db, "users", uid), {
        name,
        email,
        phone,
        role: "driver",
        createdAt: new Date(),
      });

      setSuccess("Driver added successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Add Driver</h2>
      <form onSubmit={handleAddDriver}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Driver</button>
      </form>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddDriver;
